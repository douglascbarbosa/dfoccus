import React from 'react'
import Msg from '../../i18n/Msg';
import Select2 from 'react-select2-wrapper'

const Select = (field) => {

	const { meta: { touched, error }, label, icon } = field;
	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

	return (

	    <div className={className}>
		  {label ?	
			<label className="control-label">
				{touched && error ? <i className="fa fa-times-circle-o"></i> : null} <Msg phrase={label} />
			</label> : null
		  }
          <Select2 
            style={{width: '100%'}}
            type={field.type} 
            className="select2" 
            data={field.data}
            options={
                {placeholder: field.placeholder}
            }            
	      	{...field.input}
	      />
		  {icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
	      <span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
	    </div>

	)
}

export default Select;