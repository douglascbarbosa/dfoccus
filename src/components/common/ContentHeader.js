import React from 'react'
import routes from '../../routes';
import {Link} from 'react-router-dom'
import Msg from '../i18n/Msg'


export default class ContentHeader extends React.Component {


  constructor(props) {
  	super(props);
  	this.state = {
  		icon: 'fa fa-dashboard',
  		title: 'Onion',
  		subtitle: ''

  	}
  }	

  setRouteInfo(route){
  	this.setState({ title: route.title || 'OnionPFT',
  					subtitle: route.subtitle,
  					icon: route.icon
  				  })
  }	

  componentWillMount(){
  	const {pathname} = window.location;
  	let self = this;

  	//Seach for the current route to take the information!
  	routes.forEach( route => {

  		if (pathname === route.path){
  			self.setRouteInfo(route);
  		}else if (route.child_routes){
  			route.child_routes.forEach( route => {
  					if (pathname === route.path){
  						self.setRouteInfo(route);
  					}
  			});
  		}
  	})
  }


  renderBreadcrumb(){
  	let crumbs = [];
	  const {pathname} = window.location;

	//Add the default crumb!
	crumbs.push({
		path: '/',
		menu_name: 'Home',
		icon: 'fa fa-home'
	});

  	//Search for the route!
  	routes.forEach(route => {

  		if (pathname === route.path){
  			crumbs.push({path : route.path, menu_name: route.menu_name || route.title, active : true});
  		}else if (route.child_routes){

  			route.child_routes.forEach( childRoute => {
  					if (pathname === childRoute.path){
  						//Only add the father if he has a path!
  						if (route.path){
	  						crumbs.push({path : route.path, menu_name: route.menu_name || route.title});
  						}else{
                crumbs.push({path : '', menu_name: route.menu_name || route.title, active: true});
              }

  						crumbs.push({path : childRoute.path, menu_name: childRoute.menu_name || childRoute.title, active: true } );
  					}
  			});
  		}

  	});

  	return crumbs.map( crumb => {
  		if (crumb.active){
	  		return <li key={crumb.path}  className="active" > <Msg phrase={crumb.menu_name} /> </li>
  		}else{
	  		return <li key={crumb.path} ><Link style={{color:'white'}} to={crumb.path} ><i className={crumb.icon}></i> <Msg phrase={crumb.menu_name} /></Link></li>
  		}
  	});

  }

  render() {
  	
    return (

  	  <section className="content-header" style={contentStyle}>
  	    <h1>
  	      <i className={'fa ' + this.state.icon} ></i> <Msg phrase={this.state.title} /> 
  	      <small><Msg phrase={this.state.subtitle} /></small>
  	    </h1>
  	    <ol className="breadcrumb" style={breadcrumbStyle}>
  	      {this.renderBreadcrumb()}
  	    </ol>
  	  </section>

    )
  }
}

const contentStyle = {
  background: '#222d32', 
  position: 'fixed', 
  zIndex: 901,
  width: '100%',
  minHeight: 50,
  WebkitBoxShadow: '0 6px 4px -4px rgba(0, 0, 0, 0.2)',
  MozBoxShadow: '0 6px 4px -4px rgba(0, 0, 0, 0.2)',
  boxShadow: '0 6px 4px -4px rgba(0, 0, 0, 0.2)', 
  color: 'white'

}

const breadcrumbStyle = {
  position: 'relative',
  float: 'none',
  top : 0,
  left: 0,
  color: 'white'
}