import React from 'react'
import Msg from '../../i18n/Msg';
import moment from 'moment';

import DatePicker from 'react-datepicker'; 



export default class DatePickerInput extends React.Component{

	constructor (props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}	

	handleChange (date) {
		this.props.input.onChange(moment(date).format(this.props.dateFormat))
	}	

	render(){

		const { meta: { touched, error }, label, icon, placeholder, input, dateFormat } = this.props;
	 	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

		return (


			<div className={className}>

				{label ?	
					<label className="control-label">
						{touched && error ? <i className="fa fa-times-circle-o"></i> : null} <Msg phrase={label} />
					</label> : null
				}

				<DatePicker 
					{...input}
					className="form-control"
					placeholderText={placeholder}
					selected={input.value ? moment(input.value, dateFormat) : null }
					autoComplete="off"
					{...this.props}
					onChange={this.handleChange}					
				/>

				{icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
				<span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
			</div>

		)




	}

}



// const DatePickerInput = (field) => {

// 	const { meta: { touched, error }, label, icon, showTimeSel } = field;
// 	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;



// 	return (


// 	    <div className={className}>
// 		  {label ?	
// 			<label className="control-label">
// 				{touched && error ? <i className="fa fa-times-circle-o"></i> : null} <Msg phrase={label} />
// 			</label> : null
// 		  }
// 		  {/* <div className="input-group" > */}
			
// 			{/* <div class="input-group-addon">
// 				<i class="fa fa-calendar"></i>
// 			</div> */}

// 			<DatePicker 
// 				className="form-control"
// 				placeholderText={field.placeholder}
// 				timeFormat="HH:mm"
// 				// timeIntervals={1}
// 				timeCaption="Time"
// 				showTimeSelect={showTimeSel}
// 				selected={field.input.value ? moment(field.input.value) : null }
// 				{...field.input}
// 				autoComplete="off"
// 				{...field}
// 			/>

// 		  {icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
// 	      <span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
// 		  {/* </div> */}
// 	    </div>

// 	)
// }

