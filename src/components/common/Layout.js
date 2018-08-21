import React from 'react'
import Header from './Header';
import ContentHeader from './ContentHeader';
import Navigation from '../navigation/components/Navigation';
import Footer from './Footer';
//import Sidebar from '../control-sidebar/components/Sidebar';

import * as LayoutLoader from '../../assets/adminlte'

export default class Layout extends React.Component {

  componentDidMount(){

    LayoutLoader.boxRefreshLoader(window.$);
    LayoutLoader.boxWidgetLoader(window.$);
    LayoutLoader.layoutLoader(window.$);
    LayoutLoader.pushmenuLoader(window.$);
    LayoutLoader.controlsidebarLoader(window.$);
    LayoutLoader.treeLoader(window.$);

  }

  render() {
    return (
      <div className="wrapper">
      	<Header />
      	<Navigation />

    		<div className="content-wrapper">

          <ContentHeader />

          <section className="content" style={{marginTop: 70}}>
            {this.props.children}          
          </section>

    		</div>

        <Footer />
        {/*<Sidebar />*/}
      </div>
    )
  }
}

