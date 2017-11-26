import React from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
var moment = require('moment');
//import '../../node_modules/react-bootstrap-date-time-picker/lib/react-bootstrap-date-time-picker.css'
var yesterday = moment().subtract( 1, 'day' );


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      startDate: new Date(),
      endDate: new Date()

    };

    // This binding is necessary to make `this` work in the callback
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.validateStartDate = this.validateStartDate.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.validateEndDate = this.validateEndDate.bind(this);

    // This binding is necessary to make `this` work in the callback
    this.validateForm = this.validateForm.bind(this);

  }

  validateForm() {
    return this.validateStartDate()==='success';
  }

  validateStartDate() {
    if(undefined===this.state.startDate){
       return "error";
     }
    // return true if end date is greater than start date

   var date = moment(this.state.startDate);    
   if(!date.isValid()){
       return "error";
    }else{
      return "success";
    }

  }

  validateEndDate() {
    if(undefined===this.state.endDate){
       return "error";
     }
    // return true if end date is greater than start date

   var date = moment(this.state.endDate);    
   if(!date.isValid()){
       return "error";
    }else{
      return "success";
    }

  }


  validDate( current ){
    // return current.isAfter( yesterday );
    // return true if end date is greater than start date
    return true;
  }

   handleStartDateChange = current => {
    this.setState({ startDate: current._d });
  }

   handleEndDateChange = current => {
    this.setState({ endDate: current._d });
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="startDate" validationState={this.validateStartDate()}  bsSize="large">
            <ControlLabel>Start</ControlLabel>
              <DateTime isValidDate={ this.validDate } closeOnSelect='true' onChange={this.handleStartDateChange} />
          <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="endDate" validationState={this.validateEndDate()}  bsSize="large">
            <ControlLabel>End</ControlLabel>
              <DateTime isValidDate={ this.validDate } closeOnSelect='true' onChange={this.handleEndDateChange} />
          <FormControl.Feedback />
          </FormGroup>

        </form>
      </div>
    )
  }
}

