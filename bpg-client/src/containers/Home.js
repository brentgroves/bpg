import React from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
var moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment');
var dateFormat = require('dateformat');

//var moment = require('moment');
//import '../../node_modules/react-bootstrap-date-time-picker/lib/react-bootstrap-date-time-picker.css'
var yesterday = moment().subtract( 1, 'day' );
momentLocalizer(moment);

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





  handleStartDateChange(name,value)
  {

    this.setState({ startDate: value});
  }

  handleEndDateChange(name,value)
  {
    this.setState({ endDate: value});
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="startDate" validationState={this.validateStartDate()}  bsSize="large">
            <ControlLabel>Start</ControlLabel>
              <DateTimePicker 
                onChange={this.handleStartDateChange}
                defaultValue={new Date()} 
                />
          <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="endDate" validationState={this.validateEndDate()}  bsSize="large">
            <ControlLabel>End</ControlLabel>
              <DateTimePicker 
                onChange={this.handleEndDateChange}
                defaultValue={new Date()} 
              />
          <FormControl.Feedback />
          </FormGroup>

        </form>
      </div>
    )
  }
}

/*
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
*/