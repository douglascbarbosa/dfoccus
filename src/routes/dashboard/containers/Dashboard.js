import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AlertMessage, {ALERT_MSG_ERROR} from '../../../components/common/AlertMessage'

import { Field, reduxForm } from 'redux-form'
import {Input, DatePicker, TimePicker, Select, Checkbox} from '../../../components/forms/inputs'
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import {new_task, fetch_tasks, update_task, delete_task} from '../../task/TaskActions';
import moment from 'moment';

import FullCalendar from 'fullcalendar-reactwrapper';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetch_tasks();
  }

  onSubmit(values){
//    console.log(values);
    // let teste = []
    // values.weekDay.forEach((day, index) =>{
    //   teste.push(index);
    // })
    // console.log(teste);
    this.props.new_task(values, '/dashboard');
  }

  handleEventChange(event, delta, revertFunc, jsEvent, ui, view){
    this.props.update_task(event.id, event, '/dashboard');
  }

  removeEvent(event){
    this.props.delete_task(event.id);
  }

  handleEventRender(event, element){
    const self = this;
    const $ = window.$;
    // element.append( "<span id='"+ event.id +"' class='closeon'><small class='label pull-right bg-red'><i class='fa fa-trash'></i></small></span>" );  
    element.append( "<button id='"+ event.id +"' class='btn btn-danger closeon'><i class='fa fa-trash'></i></button>" );  
    element.append( "<button id='"+ event.id +"' class='btn btn-primary edit'><i class='fa fa-pencil'></i></button>" );  
    element.append( "<button id='"+ event.id +"' class='btn btn-success done'><i class='fa fa-check'></i></button>" );  
    $(element).find($(element).find('#' + event.id)).click(() => {
      
      if (window.confirm("Delete task?")){
        self.removeEvent(event);
      }

    });
  }

  render() {

    const { handleSubmit, list} = this.props; 

    return (

      <div className="row">

        <div className="col-lg-3">
              
              <div className="box">
                <div className="box-body">
                  <form role="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="col-lg-12">
                      <Field 
                        type="text"
                        name="title"
                        component={Input}
                        placeholder="What you have to do?"
                      />
                    </div>

                    <div className="col-lg-12">
                      <Field 
                          name="start"
                          component={DatePicker}
                          dateFormat="YYYY/MM/DD"
                          autocomplete="off"
                          placeholder="Start"
                        />
                    </div>

                    <div className="col-lg-12">
                      <Field 
                          name="startTime"
                          component={TimePicker}
                          dateFormat="HH:mm"
                          autocomplete="off"
                          placeholder="At"

                        />
                    </div>


                    <div className="col-lg-12">
                      <Field 
                          name="end"
                          component={DatePicker}
                          dateFormat="YYYY/MM/DD"
                          autocomplete="off"
                          placeholder="End"
                        />
                    </div>

                    <div className="col-lg-12">
                      <Field 
                          name="endTime"
                          component={TimePicker}
                          dateFormat="HH:mm"
                          autocomplete="off"
                          placeholder="At"
                        />
                  </div>

                    {/* <div className="col-lg-2">
                      <Field 
                          type="number"
                          name="repeat"
                          component={Input}
                          showTimeSel
                          placeholder="Repeat"
                          autocomplete="off"
                        />
                    </div>

                    <div className="col-lg-3">
                      <Field 
                          name="frequence"
                          placeholder="Repeat by"
                          component={Select}
                          data={[
                            { text: 'Day', id: 'd' },
                            { text: 'Week', id: 'W'},
                            { text: 'Month', id: 'M' },
                            { text: 'Year', id: 'Y'}
                          ]}
                        />
                    </div>

                    <div className="col-lg-5">

                      <Field 
                          name="weekDay"
                          component={Checkbox}
                          inLine
                          options={
                            [
                              { value: 7, label: 'Sun' },                            
                              { value: 1, label: 'Mon' },
                              { value: 2, label: 'Tue' },
                              { value: 3, label: 'Wed' },
                              { value: 4, label: 'Thu' },
                              { value: 5, label: 'Fri' },
                              { value: 6, label: 'Sat' },
                            ]
                          }
                        />
                    </div> */}

                    <div className="col-lg-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={this.props.loading}
                      >
                        <i className="fa fa-paper-plane-o" ></i> Create task
                      </button>                                                                        

                    </div>

                  </form>


                </div>
              </div>
        </div>        
    
        <div className="col-lg-9">
              
          <div className="box">
            <div className="box-body">

              <FullCalendar 
                id = "Calendar"
                header = {{
                  left: 'prev,next today myCustomButton',
                  center: 'title',
                  right: 'month,agendaWeek,basicDay'
                }}
                defaultDate={moment()}
                navLinks= {true} // can click day/week names to navigate views
                editable= {true}
                eventLimit= {true} // allow "more" link when too many events
                events = {list}
                defaultView = 'agendaWeek'
                eventDrop = {this.handleEventChange.bind(this)}
                eventResize = {this.handleEventChange.bind(this)}
                eventRender = {this.handleEventRender.bind(this)}
                slotLabelFormat ={['HH:mm']}
                // height = 'auto'
                // eventRender = {(event, element, view) => {
                //     return event.ranges.filter( range =>
                //                (event.start.isBefore(range.end) &&
                //                 event.end.isAfter(range.start))
                //     ).length > 0;
                // }}

              />

            </div>
          </div>
        </div>
      </div>

    )
  }
}


function validate(values){

  const errors={};

  if (!values.title){
    errors.title = "Please enter the task title";
  }

  // if (!values.start){
  //   errors.start = "Please enter when the task start";
  // }

  // if (!values.end){
  //   errors.end = "Please enter when the task end";
  // }

  return errors;

}

function mapStateToProps({task}){
  return { list: task.list, error : task.error, enableReinitialize: true};
}


Dashboard = reduxForm({
  validate,
  form: 'fast-task-form'
})(Dashboard)

Dashboard = connect(mapStateToProps, {new_task, fetch_tasks, update_task, delete_task})(Dashboard);


export default Dashboard;