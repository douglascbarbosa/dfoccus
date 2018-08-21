import React from 'react'
import NavItem from './NavItem'
import Msg from '../../i18n/Msg'

export default class NavGroupItem extends React.Component {

  constructor(props){
  	super(props);

  	this.state = {
  		active : false
  	}
  	this.paths = [];
  }

  componentDidMount(){
  	const path = this.paths.find((path) => {
  		return path === window.location.pathname;
  	});

  	this.setState({active : path})
  }

  renderRouterLink(route){

    return <NavItem key={route.path} exact to={route.path}><i className={'fa ' + route.icon}></i> <Msg phrase={route.menu_name}/></NavItem>

  }

  renderChild(child_routes){
    return child_routes.map((route) => {
      if (!route.public && route.menu_name){
      	this.paths.push(route.path);
        return this.renderRouterLink(route)
      }else{
        return null
      }
    })

  }


  render() {
    
    return (

  		<li className={'treeview ' + (this.state.active ? 'active menu-open' : '')}>
  		  <a href="#">
  		    <i className={'fa ' + this.props.icon}></i> <Msg phrase={this.props.menu_name} /> 
  		    <span className="pull-right-container">
  		      <i className="fa fa-angle-left pull-right"></i>
  		    </span>
  		  </a>
  		  <ul className="treeview-menu">
  		    {this.renderChild(this.props.child_routes)}
  		  </ul>
  		</li>

    )
  }
}

