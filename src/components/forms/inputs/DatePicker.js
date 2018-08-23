import React from 'react'
import Msg from '../../i18n/Msg';
import moment from 'moment';

import DatePicker from 'react-datepicker'; 
//import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = (field) => {

	const { meta: { touched, error }, label, icon, showTimeSel } = field;
	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

	return (

	    <div className={className}>
		  {label ?	
			<label className="control-label">
				{touched && error ? <i className="fa fa-times-circle-o"></i> : null} <Msg phrase={label} />
			</label> : null
		  }
		  {/* <div className="input-group" > */}
			
			{/* <div class="input-group-addon">
				<i class="fa fa-calendar"></i>
			</div> */}

			<DatePicker 
				className="form-control"
				placeholderText={field.placeholder}
				dateFormat="MM/DD/YYYY HH:mm"
				timeFormat="HH:mm"
				// timeIntervals={1}
				timeCaption="Time"
				showTimeSelect={showTimeSel}
				selected={field.input.value ? moment(field.input.value) : null }
				{...field.input}
				autoComplete="off"
				{...field}
			/>

		  {icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
	      <span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
		  {/* </div> */}
	    </div>

	)
}

export default DatePickerInput;