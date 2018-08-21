import React from 'react'
import {connect} from 'react-redux'
import gravatar from 'gravatar'

class LoginInfo extends React.Component {
 
  render() {
    return (
      <div className="user-panel">
        <div className="pull-left image">
          <img src={gravatar.url(this.props.email)} className="img-circle" alt="User Image" />
        </div>
        <div className="pull-left info">
          <p>{this.props.username}</p>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state)=>(state.user)

export default connect(mapStateToProps)(LoginInfo);