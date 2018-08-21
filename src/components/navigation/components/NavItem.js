import React, {PropTypes} from 'react'
import {Route, Link} from 'react-router-dom'
import routes from '../../../routes';

const checkActiveRoute = (match, to) => {
	let className = 'active';

	if (match){

		return className;

	}else{
		className = null;

		const {pathname} = window.location;

	  	routes.forEach(route => {
			
			if (route.child_routes){

	  			route.child_routes.forEach( childRoute => {

	  				if (childRoute.path === pathname && route.path === to){
	  					className = 'active';
	  				}

	  			});
	  		}

	  	});

		return className;
	}
}

export default function NavItem({children, to, exact}) {
    return (
        <Route path={to} exact={exact} children={({match}) => (
            <li className={checkActiveRoute(match, to)}>
                <Link to={to}>{children}</Link>
            </li>
        )}/>
    )
}

