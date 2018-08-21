import React from 'react'
import Layout from './Layout';
import Msg from '../i18n/Msg'

export default class Layout_register extends React.Component {
  render() {
    return (
        <Layout>
           
            <div className="box box-primary">

                <div className="box-header with-border">
                    <h3 className="box-title"><Msg phrase="New Account" /></h3> 
                </div>

                {this.props.children}

            </div>

        </Layout>
    )
  }
}


  