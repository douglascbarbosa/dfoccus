import React from 'react';
import {Checkbox} from 'react-icheck';

const ICheck = (field) => {
    return (
        <div className="checkbox icheck">
            <Checkbox  
                cursor="false"
                name="keep" 
                {...field} 
                {...field.input} 
            />
        </div>  

    )
}

export default ICheck;