var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var $ = require ('jquery');

var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

const REST_API_URL = "/api/tech";

/****************************  AppComp  ******************************/
module.exports.AppComp = React.createClass({
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
            <li><Link to="/addItems">Add Items</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
});

/****************************  HomeComp  ******************************/
module.exports.HomeComp = React.createClass({
  render: function() {
      return (
        <div>
          <h3>Welcome</h3>
          <p>We are your online grocery store</p>
        </div>
      );
    }
});

/****************************  ContactComp  ******************************/
module.exports.ContactComp = React.createClass({
  render: function() {
      return (
        <div>
          <h3>Contact</h3>
          <p>Web World, Bhugaon, Pune
          </p>
        </div>
      );
    }
});

/****************************  TechnologiesComp  ******************************/
module.exports.TechnologiesComp = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: REST_API_URL,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({serverData: data});
        console.log(JSON.stringify(data));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    console.log("executing TechnologiesComp:componentDidMount");
    this.loadDataFromServer();
  },
  getInitialState: function() {
    return {serverData: [] };
  },

  render: function() {
      var htmlElementArray = this.state.serverData.map(function(anObject) {
        return (<tr>
                  <td>{anObject.tech}</td>
                  <td>{anObject.description}</td>
                  <td><Link to={'/editItem'}>Edit</Link></td>
                </tr>);
      });
      return (
        <table className="table table-striped table-condensed table-hover">
        <thead className="success">
          <tr>
            <td>Item</td>
            <td>Description</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {htmlElementArray}
        </tbody>
        </table>
      );
    }
});

/****************************  AddDataComp  ******************************/
module.exports.AddDataComp = React.createClass({
  addRecord: function(e) {
    e.preventDefault();
    console.log("Contacting server with tech=%s and description=%s",
     JSON.stringify(this.state.tech),
     JSON.stringify(this.state.description));
    $.ajax({
      url: REST_API_URL,
      dataType: 'json',
      type: 'POST',
      data: {tech: this.state.tech, description:this.state.description},
      success: function(data) {
        this.setState({tech: '', description:''});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(REST_API_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleChangeItemName(event) {
    console.log("handleChange");
    this.setState({tech: event.target.value});
  },
  handleChangeItemDescription(event) {
    console.log("handleChange");
    this.setState({description: event.target.value});
  },

  getInitialState: function() {
    return {tech: '', description: '' };
  },

  render: function() {
      return (
        <div>
          <h3>Add a new record</h3>
          <form className="well" onSubmit={this.addRecord}>
          Item Name:
          <input type="text" placeholder="Item Name"
            onChange={this.handleChangeItemName}
            value={this.state.tech} required className="form-control"/>
          Item Description:
          <input type="text" placeholder="Item Description"
            onChange={this.handleChangeItemDescription}
            value={this.state.description} required className="form-control"/>
          <input type="submit" value="Add Record" className="form-control btn btn-warning"/>
          </form>
        </div>
      );
    }
});//AddDataComp

/****************************  EditItemComp  ******************************/
module.exports.EditItemComp = React.createClass({
  updateRecord: function(e) {
    e.preventDefault();
    console.log("Contacting server with tech=%s and description=%s",
     JSON.stringify(this.state.tech),
     JSON.stringify(this.state.description));
    $.ajax({
      url: REST_API_URL + "/" + this.state.tech,
      dataType: 'json',
      type: 'PUT',
      data: {tech: this.state.tech, description:this.state.description},
      success: function(data) {
        this.setState({tech: '', description:''});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(REST_API_URL, status, err.toString());
      }.bind(this)
    });
  },

  getRecordFromServer: function() {
    $.ajax({
      url: REST_API_URL+ "/akh",
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState(data);
        console.log(JSON.stringify(data));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    console.log("executing EditItemComp:componentDidMount");
    this.getRecordFromServer();
  },

  handleChangeItemDescription(event) {
    console.log("handleChange");
    this.setState({description: event.target.value});
  },

  getInitialState: function() {
    return {tech: '', description: '' };
  },

  render: function() {
      return (
        <div>
          <h3>Update Record</h3>
          <form className="well" onSubmit={this.updateRecord}>
          Item Name:
          <input type="text" placeholder="Item Name" readOnly
            value={this.state.tech} required className="form-control"/>
          Item Description:
          <input type="text" placeholder="Item Description"
            onChange={this.handleChangeItemDescription}
            value={this.state.description} required className="form-control"/>
          <input type="submit" value="Update" className="form-control btn btn-warning"/>
          </form>
        </div>
      );
    }
});//EditItemComp
