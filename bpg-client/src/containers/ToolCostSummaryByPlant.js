import React from 'react';
import { FormGroup, FormControl, ControlLabel,Panel,Row,Col} from "react-bootstrap";
import 'react-widgets/dist/css/react-widgets.css';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import LoaderButton from "../components/LoaderButton";
//var jsreport = require("jsreport-client")('http://localhost:5488', 'admin', 'password')
var jsreport = require('jsreport-browser-client-dist');
jsreport.serverUrl = 'http://localhost:5488';
        

//const jsreport = 'http://jsreport-server:5488'


Moment.locale('en')
momentLocalizer()


export default class Home extends React.Component {
  constructor(props) {
    super(props);

/*



    var startDate = new Moment();
    moment().startOf('month');
    startDate.add(1,'days');
    */
//    var  defStartDate = mmtStart.toDate(); 
    this.state = {
      isLoading: false,
      defStartDate:Moment().startOf('month').toDate(),
      defEndDate: Moment().toDate(),
      startDate: Moment().startOf('month'),
      endDate: new Moment(),

    };

    // This binding is necessary to make `this` work in the callback
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  validateForm() {
    return this.validateDate()==='success';
  }

  validateDate() {
    if(
        (undefined===this.state.startDate)||(undefined===this.state.endDate)
        ||(""===this.state.startDate)||(""===this.state.endDate)
      ){
       return "error";
     }
    // return true if end date is greater than start date

//   var startDate = Moment(this.state.startDate);    
   if(!this.state.startDate.isValid()){
       return "error";
    }

//   var endDate = Moment(this.state.endDate);    
   if(!this.state.endDate.isValid()){
       return "error";
    }

    if(!this.state.endDate.isAfter(this.state.startDate))
    {
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

   var date = Moment(this.state.endDate);    
   if(!date.isValid()){
       return "error";
    }else{
      return "success";
    }

  }





  handleStartDateChange(value)
  {
    var newDate=new Moment(value);
    if(newDate.isValid()){
      this.setState({ startDate: newDate});
    }else{
      this.setState({ startDate: ""});
    }
  }

  handleEndDateChange(value)
  {
    var newDate=new Moment(value);
    if(newDate.isValid()){
      this.setState({ endDate: newDate});
    }else{
      this.setState({ endDate: ""});
    }
  }


  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
//      await this.login(this.state.email, this.state.password);
//      this.props.userHasAuthenticated(true);
//      this.props.history.push("/home");

//add custom headers to ajax calls
jsreport.headers['Authorization'] = "Basic " + btoa("admin:password");
/*
var request = {
   template: { 
        name: 'WorkSumTransactions',
    },
    data:{
      "dtStart": "01-1-2017 00:00:00",
      "dtEnd": "01-12-2017 23:15:10",
      "partNumber":"M0009326"
    }
};

//display report in the new tab
jsreport.render('_blank', request);
*/
var request2 = {
   template: { 
        name: 'WorkSumByPlant',
    },
    data:{
      "dtStart": "01-1-2017 00:00:00",
      "dtEnd": "01-12-2017 23:15:10",
      "plantList":",2,3,5,6,"
    }
};

//display report in the new tab
//jsreport.render('reportPlaceholder', request2);
jsreport.render('_blank', request2);


/*
jsreport.renderAsync(request).then(function(res) {
  console.log(res);

  //open in new window
  window.open(res.toDataURI())

  //open download dialog
//  res.download('test.pdf')
});
*/
/*
   jsreport.renderAsync('reportPlaceholder',{
 //       template: { shortid:"r1omgHrLe"},
        //data: { dtStart: "01-17-2017 00:00:00",dtEnd:"01-18-2017 23:15:10"}
            template: { 
                name: 'WorkSumTransactions',
            },
            data:{
              "dtStart": "01-1-2017 00:00:00",
              "dtEnd": "01-12-2017 23:15:10",
              "partNumber":"M0009326"
            }

        // data: { subject: "Busche Order",po: "122572",emailTo:"bgroves3196@yahoo.com"}
    });
    */
/*
   jsreport.render({
 //       template: { shortid:"r1omgHrLe"},
        //data: { dtStart: "01-17-2017 00:00:00",dtEnd:"01-18-2017 23:15:10"}
            template: { 
                name: 'WorkSumTransactions',
            },
            data:{
              "dtStart": "01-1-2017 00:00:00",
              "dtEnd": "01-12-2017 23:15:10",
              "partNumber":"M0009326"
            }

        // data: { subject: "Busche Order",po: "122572",emailTo:"bgroves3196@yahoo.com"}
    }, function(err, response) {
        if(err){
          alert('error');
        }else{
          response.body(function(body) {
        console.log(body.toString());            
            /*
            var dirName2 = dirName1;
            let fileName =  dirName2 + '/myfile.pdf';
            if ('development'==process.env.NODE_ENV) {
              console.log(`dirName: ${dirName}`);
              console.log(`dirName1: ${dirName1}`);
              console.log(`dirName2: ${dirName2}`);
              console.log(`fileName: ${fileName}`);
            }

            fs.writeFileSync(fileName,body);
            dispatch({ type:ACTION.SET_POWITHRECEIVERS_REPORT_DONE, done:true });
            if ('development'==process.env.NODE_ENV) {
              console.log(`Done creating file myfile.pdf `);
              console.log(`fileName: ${fileName}`);
            }
            ipcRenderer.send('asynchronous-message', fileName)
          });
        }
    });
*/
/*
        jsreport.render({ 
            template: { 
                name: 'WorkSumTransactions',
            },
            data:{
              "dtStart": "01-1-2017 00:00:00",
              "dtEnd": "01-12-2017 23:15:10",
              "partNumber":"M0009326"
            }
        });
*/
      this.setState({ isLoading: false });

    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

  }
 
  render() {

      var dateHeader;  
      var dateStyle; 
      if(this.validateDate()){
        dateHeader=<h1 style={{textAlign:'center'}}>Report Date Range</h1>;
      }else{
        dateHeader=<h1 style={{textAlign:'center'}}>Date Range Error</h1>;
      }

      dateStyle='default';
      /*
      var mmtStart = new Moment();
      mmtStart.add(1,'days');
      var  defStartDate = mmtStart.toDate(); 
      */

    return (
      <div >
        <form onSubmit={this.handleSubmit}>

        <Row>
           <Col xs={2} > 
           </Col> 
            <Col xs={8} style={{}}> 

               <Panel  className="ToolCostSummaryByPlant" bsStyle={dateStyle} header={dateHeader}> 
                 <Row> 
                   <Col xs={1} > 
                   </Col> 
                   <Col xs={10} style={{}}> 
                      <FormGroup controlId="startDate" validationState={this.validateDate()}  bsSize="large">
                        <ControlLabel>Start</ControlLabel>
                         <Row> 
                           <Col xs={11} style={{}}> 
                            <DateTimePicker 
                              onChange={this.handleStartDateChange}
                              defaultValue={ this.state.defStartDate} 
                              />
                           </Col> 
                           <Col xs={1} > 
                              <FormControl.Feedback />
                           </Col> 
                         </Row> 
                      </FormGroup>

                   </Col>
                   <Col xs={1} > 
                   </Col> 
                 </Row> 
                 <Row> 
                   <Col xs={1} > 
                   </Col> 
                   <Col xs={10} style={{}}> 
                      <FormGroup controlId="endDate" validationState={this.validateDate()}  bsSize="large">
                        <ControlLabel>End</ControlLabel>
                         <Row> 
                           <Col xs={11} style={{}}> 
                              <DateTimePicker 
                                onChange={this.handleEndDateChange}
                                defaultValue={this.state.defEndDate} 
                                />
                           </Col> 
                           <Col xs={1} > 
                              <FormControl.Feedback />
                           </Col>
                         </Row> 
                      </FormGroup>
                   </Col> 
                   <Col xs={1} > 
                   </Col> 
                 </Row> 
               </Panel> 
             </Col> 
             <Col xs={2} > 
             </Col> 
           </Row> 

           <Row> 
              <Col xs={5} >&nbsp;</Col> 
              <Col xs={2}>
               <LoaderButton
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                  isLoading={this.state.isLoading}
                  text="Run"
                  loadingText="Running…"
                />
              </Col> 
             <Col xs={5}>&nbsp;</Col> 
           </Row> 
         </form>

    <div id="reportPlaceholder"></div>
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