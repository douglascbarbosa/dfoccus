import React from 'react'
import Msg from '../../i18n/Msg';
import CurrencyInput from 'react-currency-input';
import NumberFormat from 'react-number-format';

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
        <div className="input-group">
            <div className="input-group-addon">
                {/* <i className="fa fa-money"></i> */}
                R$ 
            </div>


            <NumberFormat 
                type={field.type}
                thousandSeparator = "."
                decimalSeparator=","
                decimalScale={2}
                className="form-control"
                placeholder={field.placeholder}   
                {...field.input}
                {...field}                
            />
            {/* <CurrencyInput 
                type={field.type}
                prefix="R$"
                decimalSeparator="," 
                thousandSeparator="."
                className="form-control"
                placeholder={field.placeholder}   
                {...field.input}
                {...field}
            /> */}

            {icon ? <i className={'fa form-control-feedback ' + icon}></i> : null}
            <span className="help-block">{touched ? <Msg phrase={error} /> : ''}</span>
          </div>
	    </div>

	)
}

export default Input;