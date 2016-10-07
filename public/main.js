var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var comp = require('./components/GroceryComponents.js');
var rootComp = require('./components/RootComponent.js');
var ilComp = require('./components/ItemListComponent.js');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

var { Router, Route, IndexRoute, IndexLink, Link } = ReactRouter;

ReactDOM.render(
  <Router>
    <Route path="/" component={rootComp.RootComp}>
      <IndexRoute component={comp.HomeComp}/>
      <Route path="items" component={ilComp.ItemListComp} />
      <Route path="addItems" component={comp.AddItemComp} />
      <Route path="contact" component={comp.ContactComp} />
      <Route path="editItem/:itemID" component={comp.EditItemComp} />
      <Route path="deleteItem/:itemID" component={comp.DeleteItemComp} />
    </Route>
  </Router>,
  document.getElementById('mount-point')
);
