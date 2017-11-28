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

/**
 * React component which renders the given content into an iframe.
 * Additionally an array of stylesheet urls can be passed. They will 
 * also be loaded into the iframe.
 */
class ExampleContainer extends React.Component {
    
    static propTypes = {
    //    content: React.PropTypes.string.isRequired,
   //     stylesheets: React.PropTypes.arrayOf(React.PropTypes.string),
    };

    /**
     * Called after mounting the component. Triggers initial update of
     * the iframe
     */
    componentDidMount() {
        this._updateIframe();
    }

    /**
     * Called each time the props changes. Triggers an update of the iframe to
     * pass the new content
     */
    componentDidUpdate() {
        this._updateIframe();
    }

    /**
     * Updates the iframes content and inserts stylesheets.
     * TODO: Currently stylesheets are just added for proof of concept. Implement
     * and algorithm which updates the stylesheets properly.
     */
    _updateIframe() {
//        const iframe = this.refs.iframe;
//        iframe.src=this.content;
        document.getElementById('rpt').src = this.content;
        /*

        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const head = document.getElementsByTagName('head')[0];
        document.body.innerHTML = this.props.content;
        
        this.props.stylesheets.forEach(url => {
            const ref = document.createElement('link');
            ref.rel = 'stylesheet';
            ref.type = 'text/css';
            ref.href = url;
            head.appendChild(ref);
        });
        */
    }

    /**
     * This component renders just and iframe
     */
    render() {
        return <iframe ref="iframe"  id="rpt" width="400" height="200" />
    }
}


export default class Home extends React.Component {
  constructor(props) {
    super(props);

/*



    var startDate = new Moment();
    moment().startOf('month');
    startDate.add(1,'days');

{
  "dtStart": "01-1-2017 00:00:00",
  "dtEnd": "01-12-2017 23:15:10",
  "plantList":",2,3,5,6,"

}

    */
//    var  defStartDate = mmtStart.toDate(); 
    this.state = {
      isLoading: false,
      step:1,
      defStartDate:Moment().startOf('month').toDate(),
      defEndDate: Moment().toDate(),
      startDate: Moment().startOf('month'),
      endDate: new Moment(),
      content: `<h1>Title</h1><button class="btn btn-primary">Test</button>`,
      counter: 0,
      styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
      ]

    };

    // This binding is necessary to make `this` work in the callback
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    // This binding is necessary to make `this` work in the callback
    this.afterReport = this.afterReport.bind(this);

          this.increaseCounter = this.increaseCounter.bind(this);
  

  }
    /**
     * Set a new state with an increased counter
     */
    increaseCounter() {
        this.setState(Object.assign({}, this.state, {
            counter: this.state.counter + 1
        }));
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

afterReport(res){

    var html = '<html>' +
            '<style>html,body {padding:0;margin:0;} iframe {width:100%;height:100%;border:0}</style>' +
            '<body>' +                                
            '<iframe type="application/pdf" src="' +  res.toDataURI() + '"></iframe>' +
            '</body></html>';

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    document.body.innerHTML = html;


  //    var document =  document.getElementById('rpt2').contentDocument;
//document.body.innerHTML = html;      

 //   this.setState({content: str});
//    this.setState({content: `<h1>Title</h1><button class="btn btn-primary">Test2</button>`});

//    var str = res.toDataURI();
//    var str2 = res.toString();
//   window.open(res.toDataURI())
    this.setState({ isLoading: false });    
}

  handleSubmit = async event => {
    event.preventDefault();
 //   this.setState({ isLoading: true });
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
var dtStart=this.state.startDate.format('MM-DD-YYYY h:mm:ss');


var dtEnd=this.state.endDate.format('MM-DD-YYYY h:mm:ss');
//var dtStart=this.startDate.format('MM-DD-YYYY HH:MM:SS');
var request2 = {
   template: { 
        name: 'WorkSumByPlant',
    },
    data:{
      "dtStart": '',
      "dtEnd": '',
      "plantList":",2,3,5,6,"
    }

};

request2.data.dtStart = dtStart;
request2.data.dtEnd = dtEnd;

//display report in the new tab
//const newUser = await jsreport.render('reportPlaceholder', request2);
    //this.setState({ step: 2 });    

//var t=5;


jsreport.render('_blank', request2);
//alert('sync ?');


//jsreport.renderAsync(request2).then(this.afterReport)
/*
jsreport.renderAsync(request2).then(function(res) {
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
  //    this.setState({ isLoading: false });

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

        const content = this.state.content;
        const counter = this.state.counter;
        const styles = this.state.styles;
var myForm;

if(this.state.step===1){
myForm =
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
                      <Row>

                        <ControlLabel>Start</ControlLabel>
                        </Row>
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
                      <Row>
                        <ControlLabel>End</ControlLabel>
                        </Row>

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
}else{
  myForm = "";

}

    return (
      <div >
      {myForm}
       <div id="reportPlaceholder" width="400" height="800"></div>

 
 

      </div>
    )
  }
}


/*
    <div id="rpt2" width="400" height="800"></div>

       <iframe   id="rpt2" width="400" height="200" />

            <div>
                <ExampleContainer content={content + counter} stylesheets={styles} />
                <button onClick={this.increaseCounter}>InreaseCounter</button>
            </div>

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