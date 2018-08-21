import React from 'react'
import Msg from '../../i18n/Msg';

const Checkbox = (field) => {

	const { meta: { touched, error }, label, icon } = field;
	const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

	return (

        <div className="checkbox">
            <label>
                <input type="checkbox" /> <Msg phrase={label} />
            </label>
        </div>

	)
}

export default Checkbox;