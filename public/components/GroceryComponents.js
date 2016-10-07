var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var $ = require ('jquery');

const REST_API_URL = "/api/tech";

/****************************  AddItemComp  ******************************/
module.exports.AddItemComp = React.createClass({
  addRecord: function(e) {
    e.preventDefault();
    //console.log("Contacting server with tech=%s and description=%s",
    // JSON.stringify(this.state.tech),
    // JSON.stringify(this.state.description));
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
    //console.log("handleChangeItemName");
    this.setState({tech: event.target.value});
  },
  handleChangeItemDescription(event) {
    //console.log("handleChangeItemDescription");
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
     //console.log("Contacting server with tech=%s and description=%s",
     //JSON.stringify(this.state.tech),
     //JSON.stringify(this.state.description));
    $.ajax({
      url: REST_API_URL + "/" + this.props.params.itemID,
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
      url: REST_API_URL + "/" + this.props.params.itemID,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState(data);
        //console.log(JSON.stringify(data));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    //console.log("executing EditItemComp:componentDidMount");
    this.getRecordFromServer();
  },

  handleChangeItemDescription(event) {
    //console.log("handleChangeItemDescription");
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


/****************************  DeleteItemComp  ******************************/
module.exports.DeleteItemComp = React.createClass({
  deleteRecord: function(e) {
    e.preventDefault();
     //console.log("Contacting server with tech=%s and description=%s",
     //JSON.stringify(this.state.tech),
     //JSON.stringify(this.state.description));
    $.ajax({
      url: REST_API_URL + "/" + this.props.params.itemID,
      dataType: 'json',
      type: 'DELETE',
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
      url: REST_API_URL + "/" + this.props.params.itemID,
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
    //console.log("executing EditItemComp:componentDidMount");
    this.getRecordFromServer();
  },

  getInitialState: function() {
    return {tech: '', description: '' };
  },

  render: function() {
      return (
        <div>
          <h3>Delete Record</h3>
          <form className="well" onSubmit={this.deleteRecord}>
          Item Name:
          <input type="text" placeholder="Item Name" readOnly
            value={this.state.tech} required className="form-control"/>
          Item Description:
          <input type="text" placeholder="Item Description" readOnly
            value={this.state.description} required className="form-control"/>
          <input type="submit" value="Delete" className="form-control btn btn-warning"/>
          </form>
        </div>
      );
    }
});//DeleteItemComp

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
          <p>Web World, Bhugaon, Pune </p>
        </div>
      );
    }
});
