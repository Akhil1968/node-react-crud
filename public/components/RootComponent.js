var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var $ = require ('jquery');

var { Router, Route, IndexRoute, IndexLink, Link } = ReactRouter;

/****************************  RootComp  ******************************/
module.exports.RootComp = React.createClass({
  getInitialState: function() {
    console.log("executing AppComp:getInitialState");
    return {data: []};
  },

  render: function() {
    return (
      <div>
        <h1> Grocery Farm</h1>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
});
