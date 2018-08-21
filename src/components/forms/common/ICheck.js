import 'icheck/skins/all.css'; // or single skin css
import React from 'react'
import {Checkbox} from 'react-icheck';

export default class ICheck extends React.Component {
  render() {
    return (
      <div className="checkbox icheck">
		    <Checkbox {...this.props} />
      </div>  
    )
  }
}

