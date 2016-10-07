var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var $ = require ('jquery');

const REST_API_URL = "/api/tech";

/****************************  ItemListComp  ******************************/
module.exports.ItemListComp = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: REST_API_URL,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({serverData: data});
        //console.log(JSON.stringify(data));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    //console.log("executing TechnologiesComp:componentDidMount");
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
                  <td><ReactRouter.Link to={'/editItem/' + anObject.tech}>
                    <span className="glyphicon glyphicon-pencil"></span>
                  </ReactRouter.Link></td>
                  <td><ReactRouter.Link to={'/deleteItem/' + anObject.tech}>
                    <span className="glyphicon glyphicon-remove"></span>
                  </ReactRouter.Link></td>
                </tr>);
      });
      return (
      <div>
        <ReactRouter.Link to={'/addItems'}>
          <span className="glyphicon glyphicon-plus"></span>Add Item
        </ReactRouter.Link>

        <table className="table table-striped table-condensed table-hover">
        <thead className="success">
          <tr>
            <td>Item</td>
            <td>Description</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {htmlElementArray}
        </tbody>
        </table>
        
        <ReactRouter.Link to={'/addItems'}>
          <span className="glyphicon glyphicon-plus"></span>Add Item
        </ReactRouter.Link>
      </div>
      );
    }
});
