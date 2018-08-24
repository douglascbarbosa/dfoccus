import React from 'react'
import Msg from '../../i18n/Msg';
import { Field } from 'redux-form';
import { options } from 'sw-toolbox';

function renderCheckbox(field){
    
    const {label, inLine} = field;

    return (

        inLine ?
            <label className="inLineCheck">
                <input 
                    type="checkbox" 
                    {...field.input}  
                /> <Msg phrase={label} />
            </label>
        :    
        <div className="checkbox">
            <label>
                <input 
                    type="checkbox" 
                    {...field.input}                    
                /> <Msg phrase={label} />
            </label>
        </div>

    )

}

const Checkbox = (field) => {

	const { meta: { touched, error }, label, inLine, options } = field;

    if (options){

        return options.map((option, index) => {
            return (
                <Field
                    key={index}
                    name={`${field.input.name}[${option.value}]`}
                    label={option.label}
                    checked={field.input.value[option.value]}
                    value={option.value}
                    component={Checkbox}
                    inLine={inLine}
                />
            )
        })

    }else{

       return renderCheckbox(field);
    }
}

export default Checkbox;
