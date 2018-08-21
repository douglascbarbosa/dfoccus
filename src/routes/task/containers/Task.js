import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ActionButtonGroup from '../../../components/common/ActionButtonGroup'
import Msg from '../../../components/i18n/Msg'
import {Input, Select, CurrencyInput} from '../../../components/forms/inputs'
import { new_task, update_task, fetch_task, clear_form_task } from '../TaskActions';
import Form from '../../../components/forms/Form';
import AlertMessage, {ALERT_MSG_ERROR} from '../../../components/common/AlertMessage';

class Task extends React.Component {

  componentWillUnmount(){
    this.props.clear_form_task();
  }

  componentWillMount(){

    if (this.props.match.params.id){
      this.props.fetch_task(this.props.match.params.id)
    }

  }

  onSubmit(values){

     if (this.props.match.params.id){
       this.props.update_task(this.props.match.params.id, values)
     }else{
       this.props.new_task(values)
     }  

  }

  render() {

    const { handleSubmit } = this.props;      

    return (

      <div>

        <AlertMessage type={ALERT_MSG_ERROR} message={this.props.error} />

        <Form title="New task" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="col-lg-6">

                <Field 
                  type="text"
                  name="task"  
                  component={Input}
                  label="Task"
                  placeholder="Task title"
                />

              </div>  
              
              <div className="col-lg-6">

                <Field 
                    type="select"
                    name="closing_day"  
                    component={Select}
                    label="Closing day"
                    data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31]}
                    placeholder="Select the close day"
                  />
              </div>

              <div className="col-lg-6">

                <Field 
                    type="select"
                    name="payment_day"  
                    component={Select}
                    label="Payment day"
                    data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31]}
                    placeholder="Select the payment day"
                  />
              </div>

              <div className="col-lg-6">
               
               <Field 
                 type="text"
                 name="limit"
                 component={CurrencyInput}
                 label="Limit"
               />

             </div>
             


        </Form>

      </div>
    )
  }
}

function validate(values){

  const errors={};

  if (!values.name){
    errors.name = "Please enter the card name";
  }

  return errors;
}

function mapStateToProps({task}){
  return { error : task.error, enableReinitialize: true, initialValues: task.task };
}

Task = reduxForm({
  validate,
  form: 'task-form'
})(Task)

Task = connect(mapStateToProps, {new_task, fetch_task, update_task, clear_form_task})(Task);

export default Task;