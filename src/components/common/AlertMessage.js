import React from 'react';

export const ALERT_MSG_ERROR = 'ALERT_MSG_ERROR';
export const ALERT_MSG_WARNING = 'ALERT_MSG_WARNING';
export const ALERT_MSG_SUCCESS = 'ALERT_MSG_SUCCESS';
export const ALERT_MSG_INFO = 'ALERT_MSG_INFO';

const AlertMessage = ({message, type, onClearMsg}) => {

    //Only shows if have a message!
    if (message){


        switch (type){
            case ALERT_MSG_ERROR:
              return (

                <div className="alert alert-danger alert-dismissible">
                    <button type="button" className="close" aria-hidden="true" onClick={onClearMsg}>&times;</button>
                    <i className="icon fa fa-ban"></i> {message}
                </div>

              );
            case ALERT_MSG_WARNING:
                return (
                    <div class="alert alert-warning alert-dismissible">
                        <button type="button" class="close" aria-hidden="true" onClick={onClearMsg}>&times;</button>
                        <i class="icon fa fa-warning"></i> {message} 
                    </div>
                        
                ) 
            case ALERT_MSG_SUCCESS:
                return (
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" aria-hidden="true" onClick={onClearMsg}>&times;</button>
                        <i className="icon fa fa-check"></i> {message}  
                    </div>
                )     
            default:
                return (
                    <div classNameName="alert alert-info alert-dismissible">
                        <button type="button" className="close" aria-hidden="true" onClick={onClearMsg}>&times;</button>
                        <i className="icon fa fa-info"></i> {message}
                    </div>
                )
          }

    }else{
        return null;
    }

}

export default AlertMessage;