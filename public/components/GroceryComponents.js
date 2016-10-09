var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var $ = require ('jquery');

const REST_API_URL = "/api/groceryitem";

/****************************  AddItemComp  ******************************/
module.exports.AddItemComp = React.createClass({
  addRecord: function(e) {
    e.preventDefault();
    $.ajax({
      url: REST_API_URL,
      dataType: 'json',
      type: 'POST',
      data: {
        tech:             this.state.tech,
        itemDescription:  this.state.itemDescription,
        itemCategory:     this.state.itemCategory,
        itemName:         this.state.itemName,
        measurement:      this.state.measurement,
        measurementUnit:  this.state.measurementUnit,
        price:            this.state.price

      },
      success: function(data) {
        this.props.history.push('/items');
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
  hChangeItemDescription(event) {
    //console.log("handleChangeItemDescription");
    this.setState({itemDescription: event.target.value});
  },
  hChangeItemCategory(event) {
    this.setState({itemCategory: event.target.value});
  },
  hChangeItemName(event) {
    this.setState({itemName: event.target.value});
  },
  hChangeMeasurement(event) {
    this.setState({measurement: event.target.value});
  },
  hChangeMeasurementUnit(event) {
    this.setState({measurementUnit: event.target.value});
  },
  hChangePrice(event) {
    this.setState({price: event.target.value});
  },


  getInitialState: function() {
    return {
      tech: '',
      itemDescription: '',
      itemCategory: '',
      itemName: '',
      measurement: 0,
      measurementUnit: '',
      price: 0
     };
  },

  render: function() {
      return (
        <div>
          <h3>Add a new record</h3>
          <form className="well" onSubmit={this.addRecord}>

          Item Name*:
          <input type="text" placeholder="Item Name" required
            onChange={this.handleChangeItemName}
            value={this.state.tech} required className="form-control"/>

          Item Description:
          <input type="text" placeholder="Item Description"
            onChange={this.hChangeItemDescription}
            value={this.state.itemDescription} required className="form-control"/>

          Item Category*:
          <input type="text" placeholder="Item Category" required
            onChange={this.hChangeItemCategory}
            value={this.state.itemCategory} required className="form-control"/>

          Item Name*:
          <input type="text" placeholder="Item Name" required
            onChange={this.hChangeItemName}
            value={this.state.itemName} required className="form-control"/>

          Item measurement*:
          <input type="text" placeholder="Measurement" required
            onChange={this.hChangeMeasurement}
            value={this.state.measurement} required className="form-control"/>

          Item Measurement Unit*:
          <input type="text" placeholder="Measurement Unit" required
            onChange={this.hChangeMeasurementUnit}
            value={this.state.measurementUnit} required className="form-control"/>

          Item Price*:
          <input type="text" placeholder="Price" required
            onChange={this.hChangePrice}
            value={this.state.price} required className="form-control"/>

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

    $.ajax({
      url: REST_API_URL + "/" + this.props.params.itemID,
      dataType: 'json',
      type: 'PUT',
      data: {
        tech:             this.state.tech,
        itemDescription:  this.state.itemDescription,
        itemCategory:     this.state.itemCategory,
        itemName:         this.state.itemName,
        measurement:      this.state.measurement,
        measurementUnit:  this.state.measurementUnit,
        price:            this.state.price
      },
      success: function(data) {
        this.props.history.push('/items');
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

  hChangeItemName(event) {
    this.setState({tech: event.target.value});
  },
  hChangeItemDescription(event) {
    this.setState({itemDescription: event.target.value});
  },
  hChangeItemCategory(event) {
    this.setState({itemCategory: event.target.value});
  },
  hChangeItemName(event) {
    this.setState({itemName: event.target.value});
  },
  hChangeMeasurement(event) {
    this.setState({measurement: event.target.value});
  },
  hChangeMeasurementUnit(event) {
    this.setState({measurementUnit: event.target.value});
  },
  hChangePrice(event) {
    this.setState({price: event.target.value});
  },

  getInitialState: function() {
    return  {
        tech: '',
        itemDescription: '',
        itemCategory: '',
        itemName: '',
        measurement: 0,
        measurementUnit: '',
        price: 0
       };
  },

  render: function() {
      return (
        <div>
          <h3>Update Record</h3>
          <form className="well" onSubmit={this.updateRecord}>
            Item Name*:
            <input type="text" placeholder="Item Name" required
              onChange={this.hChangeItemName}
              value={this.state.tech} required className="form-control"/>

            Item Description:
            <input type="text" placeholder="Item Description"
              onChange={this.hChangeItemDescription}
              value={this.state.itemDescription} required className="form-control"/>

            Item Category*:
            <input type="text" placeholder="Item Category" required
              onChange={this.hChangeItemCategory}
              value={this.state.itemCategory} required className="form-control"/>

            Item Name*:
            <input type="text" placeholder="Item Name" required
              onChange={this.hChangeItemName}
              value={this.state.itemName} required className="form-control"/>

            Item measurement*:
            <input type="text" placeholder="Measurement" required
              onChange={this.hChangeMeasurement}
              value={this.state.measurement} required className="form-control"/>

            Item Measurement Unit*:
            <input type="text" placeholder="Measurement Unit" required
              onChange={this.hChangeMeasurementUnit}
              value={this.state.measurementUnit} required className="form-control"/>

            Item Price*:
            <input type="text" placeholder="Price" required
              onChange={this.hChangePrice}
              value={this.state.price} required className="form-control"/>
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
    $.ajax({
      url: REST_API_URL + "/" + this.props.params.itemID,
      dataType: 'json',
      type: 'DELETE',
      data: {tech: this.state.tech},
      success: function(data) {
        this.props.history.push('/items');
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
    return  {
        tech: '',
        itemDescription: '',
        itemCategory: '',
        itemName: '',
        measurement: 0,
        measurementUnit: '',
        price: 0
       };
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
            value={this.state.itemDescription} required className="form-control"/>

          Item Category:
          <input type="text" placeholder="Item Category" readOnly
            value={this.state.itemCategory} required className="form-control"/>

          Item Name:
          <input type="text" placeholder="Item Name" readOnly
            value={this.state.itemName} required className="form-control"/>

          Item Measurement:
          <input type="text" placeholder="Item Measurement" readOnly
            value={this.state.measurement} required className="form-control"/>

          Measurement Unit:
          <input type="text" placeholder="Measurement Unit" readOnly
            value={this.state.measurementUnit} required className="form-control"/>

          Price:
          <input type="text" placeholder="Price" readOnly
            value={this.state.price} required className="form-control"/>

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
