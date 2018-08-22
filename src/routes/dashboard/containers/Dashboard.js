import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AlertMessage, {ALERT_MSG_ERROR} from '../../../components/common/AlertMessage'

import { Field, reduxForm } from 'redux-form'
import {Input, DatePicker} from '../../../components/forms/inputs'
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import {new_task, fetch_tasks} from '../../task/TaskActions';

import FullCalendar from 'fullcalendar-reactwrapper';

class Dashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      events:[
            {
              title: 'All Day Event',
              start: '2018-08-01'
            },
            {
              title: 'Long Event',
              start: '2017-05-07',
              end: '2017-05-10'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2017-05-09T16:00:00'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2017-05-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2017-05-11',
              end: '2017-05-13'
            },
            {
              title: 'Meeting',
              start: '2017-05-12T10:30:00',
              end: '2017-05-12T12:30:00'
            },
            {
              title: 'Birthday Party',
              start: '2017-05-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2018-08-22'
            }
          ],		
      }    

  }

  componentWillMount(){
    this.props.fetch_tasks();
  }

  onSubmit(values){
    this.props.new_task(values);
  }


  render() {

    const { handleSubmit, list} = this.props;      

    return (

      <div className="row">

        <div className="col-lg-12">
              
              <div className="box">
                <div className="box-body">
                  <form role="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="col-lg-4">
                      <Field 
                        type="text"
                        name="title"
                        component={Input}
                        placeholder="What you have to do?"
                      />
                    </div>

                    <div className="col-lg-3">
                      <Field 
                          name="start"
                          component={DatePicker}
                          showTimeSel
                          placeholder="Start at"
                        />
                    </div>

                    <div className="col-lg-3">
                      <Field 
                          name="end"
                          component={DatePicker}
                          showTimeSel
                          placeholder="End at"
                        />
                    </div>

                    <div className="col-lg-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={this.props.loading}
                      >
                        <i className="fa fa-paper-plane-o" ></i> Save
                      </button>                                                                        

                    </div>

                  </form>


                </div>
              </div>
        </div>        
    
        <div className="col-lg-12">
              
          <div className="box">
            <div className="box-body">

              <FullCalendar 
                id = "your-custom-ID"
                header = {{
                  left: 'prev,next today myCustomButton',
                  center: 'title',
                  right: 'month,agendaWeek,basicDay'
                }}
                // defaultDate={'2017-09-12'}
                navLinks= {true} // can click day/week names to navigate views
                editable= {true}
                eventLimit= {true} // allow "more" link when too many events
                events = {list}
                defaultView = 'agendaWeek'

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

  if (!values.start){
    errors.start = "Please enter when the task start";
  }

  if (!values.end){
    errors.end = "Please enter when the task end";
  }

  return errors;

}

function mapStateToProps({task}){
  return { list: task.list, error : task.error, enableReinitialize: true};
}


Dashboard = reduxForm({
  validate,
  form: 'fast-task-form'
})(Dashboard)

Dashboard = connect(mapStateToProps, {new_task, fetch_tasks})(Dashboard);


export default Dashboard;