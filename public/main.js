var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var comp = require('./GroceryComponents.js');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

ReactDOM.render(
  <Router>
    <Route path="/" component={comp.AppComp}>
      <IndexRoute component={comp.HomeComp}/>
      <Route path="items" component={comp.TechnologiesComp} />
      <Route path="addItems" component={comp.AddDataComp} />
      <Route path="contact" component={comp.ContactComp} />
      <Route path="editItem" component={comp.EditItemComp} />
    </Route>
  </Router>,
  document.getElementById('mount-point')
);
