import React from 'react'
import Msg from '../../i18n/Msg';

const Input = (field) => {

	const { meta: { touched, error }, label, icon } = field;
	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

	return (

	    <div className={className}>
		  {label ?	
			<label className="control-label">
				{touched && error ? <i className="fa fa-times-circle-o"></i> : null} <Msg phrase={label} />
			</label> : null
		  }
	      <input 
	      	type={field.type} 
			className="form-control"
			placeholder={field.placeholder}   
	      	{...field.input}
	      />
		  {icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
	      <span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
	    </div>

	)
}

export default Input;