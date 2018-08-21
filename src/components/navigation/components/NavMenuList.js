import React from 'react'
import routes from '../../../routes'
import {Link} from 'react-router-dom'
import NavItem from './NavItem'
import NavGroupItem from './NavGroupItem';
import Msg from '../../i18n/Msg'

export default class NavMenuList extends React.Component {

  renderRouterLink(route){

    return <NavItem key={route.path} exact to={route.path}><i className={'fa ' + route.icon}></i> <Msg phrase={route.menu_name}/></NavItem>

  }

  renderChild(child_routes){
    return child_routes.map((route) => {
      if (!route.public){
        return this.renderRouterLink(route)
      }else{
        return null
      }
    })

  }

  renderRouteList(){

    return routes.map((route) => {

      if (!route.component && route.child_routes){

        if (route.menu_name){
          return (
            <NavGroupItem key={route.menu_name} icon={route.icon} menu_name={route.menu_name} child_routes={route.child_routes} />
          )
        }else{
          return this.renderChild(route.child_routes)
        }

      }else{
        if (!route.public){
          return  this.renderRouterLink(route)
        }else{
          return null
        }
      }
    })
  }

  render() {
    return (

  		<ul className="sidebar-menu" data-widget="tree">
  		 	<li style={{marginTop: 6}}></li>

        {this.renderRouteList()}
  		 	
  		</ul>

    )
  }
}

