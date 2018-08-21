import React from 'react'

import {layoutLoader} from '../../assets/adminlte'

export default class Layout_blank extends React.Component {

    componentWillMount(){
    }

    componentDidMount(){
      layoutLoader(window.$);
      window.$('body').addClass('login-page');
    }
    
    componentWillUnmount(){
      window.$('body').removeClass('login-page');
    }

    render() {

      return (

        <div>
          {this.props.children}
        </div>

      )
  }
}

