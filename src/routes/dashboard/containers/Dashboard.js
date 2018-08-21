import React from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import AlertMessage, {ALERT_MSG_ERROR} from '../../../components/common/AlertMessage'

import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

import FullCalendar from 'fullcalendar-reactwrapper';

export default class Dashboard extends React.Component {

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
              start: '2017-05-28'
            }
          ],		
      }    

  }

  render() {
    return (

      <div className="row">
        <div className="col-xs-12">
              
          <div className="box">
            <div className="box-body">

              <FullCalendar 
                id = "your-custom-ID"
                header = {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
                }}
                defaultDate={'2017-09-12'}
                navLinks= {true} // can click day/week names to navigate views
                editable= {true}
                eventLimit= {true} // allow "more" link when too many events
                events = {this.state.events}
              />

            </div>
          </div>
        </div>
      </div>

    )
  }
}

