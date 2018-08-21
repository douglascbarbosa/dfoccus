import React from 'react';
import Msg from '../i18n/Msg';
import ActionButtonGroup from '../common/ActionButtonGroup';
import history from '../../routes/History';
import {findDOMNode} from 'react-dom'

export default class Form extends React.Component {

    onBackClick(){
        history.goBack();
    }

    handleSaveClick(){
        this.btnSubmit.click();
    }

    render(){
        return (
            <div className="box box-primary">

                <div className="box-header with-border">
                    <h3 className="box-title"><Msg phrase={this.props.title} /></h3> 
                </div>
        
                <ActionButtonGroup>
                    <a className="btn btn-app" onClick={this.onBackClick.bind(this)}><i className="fa fa-mail-reply"></i> <Msg phrase="Cancel" /></a>
                    <a onClick={this.handleSaveClick.bind(this)} className="btn btn-app"><i className="fa fa-save"></i> <Msg phrase="Save" /> </a>
                </ActionButtonGroup>
        
                <form onSubmit={this.props.onSubmit} role="form">
        
                    <div className="box-body">
            
                        <div className="row">
                            {this.props.children}
                        </div>
            
                    </div>
        
                    <div className="box-footer">
                        <a onClick={this.onBackClick.bind(this)} className="btn btn-default" style={{marginRight: 5 }}><i className="fa fa-mail-reply"></i> <Msg phrase="Cancel" /></a>
                        <button ref={btnSubmit => this.btnSubmit = btnSubmit} type="submit" className="btn btn-primary"><i className="fa fa-save"></i> <Msg phrase="Save" /></button>
                    </div>
        
            </form>
          
          </div>
                
        )
    }

}