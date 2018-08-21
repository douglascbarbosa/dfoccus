import React from 'react'
import {Link} from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { registerUser } from '../../../components/user/UserActions';
import Input from '../../../components/forms/inputs/Input';
import ICheck from '../../../components/forms/inputs/ICheck';
import AlertMessage, {ALERT_MSG_ERROR} from '../../../components/common/AlertMessage';

class Register extends React.Component {
  
  onSubmit(values){
		this.props.registerUser(values);
	}
  
  render() {

    const { handleSubmit, loading, msgError } = this.props;    

    return (


      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html"><b>Onion</b>PFT</a>
        </div>

        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>

          <AlertMessage message={msgError} type={ALERT_MSG_ERROR} />

          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}  >

              <Field 
                type="text"
                name="name"  
                component={Input}
                icon="fa-user"
                placeholder="Full name"
              />

              <Field 
                type="text"
                name="email"  
                component={Input}
                icon="fa-envelope"
                placeholder="E-mail"
              />

              <Field 
                type="password"
                name="password"  
                component={Input}
                icon="fa-lock"
                placeholder="Password"
              />

            <div className="row">
              <div className="col-xs-8">
              </div>

              <div className="col-xs-4">

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={this.props.loading}
                >
                  {this.props.loading ? 'Registing...': 'Register'}
                </button>                                                                        
              
              </div>

            </div>
          </form>

          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign up using
              Google+</a>
          </div>

          <Link className="text-center" to="login"> I already have a membership</Link>
        </div>
      </div>

    )
  }
}

function validate(values){

  const errors={};

  if (!values.name){
    errors.name = "Please enter your name";
  }


  if (!values.email){
    errors.email = "Please enter your email address";
  }
  // else if ( ! Functions.isEmailValid( values.email)){
  //     errors.email = "E-mail inválido";
  // }

  if (!values.password){
      errors.password = "Please enter your password";
  }else if (values.password.length < 6){
    errors.password = "Password should be at least 6 characters";
  }

  // if errors is empty, the form is fine to submit
  return errors;

}

function mapStateToProps({user}){
  const { loading, error } = user;

  return { loading, msgError : error };
}

export default reduxForm({
  validate,
  form: 'RegisterForm'
})(
  connect(mapStateToProps,{registerUser})(Register)
);


