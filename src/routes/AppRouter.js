import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
//import { createBrowserHistory } from 'history';

import history from './History';

import Layout from '../components/common/Layout';
import Layout_blank from '../components/common/Layout_blank';
import Layout_register from '../components/common/Layout_register'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import routes from './';

//Define the layouts list, used by routes!
const layouts = [];
layouts['layout'] = Layout;
layouts['layout_blank'] = Layout_blank;

//export const history = createBrowserHistory();

//Return the route component!
function getRoute( route ){

	if (route.component){
		if (route.public){
			return <PublicRoute key={route.path} layout_type={layouts[route.layout_name]} path={route.path} component={route.component} />
		}else{
			return <PrivateRoute key={route.path} layout_type={layouts[route.layout_name]} path={route.path} component={route.component} />
		}
	}else{
		return null
	}
}

//Creating the app routes!
const componentsRoutes = routes.map((route) => {

	if (route.child_routes){

		//Take the child routes!
		const child_routes = route.child_routes.map((route) => { return getRoute(route) } );
		
		//Push the father route on the array!
		if (route.component){
			child_routes.push(getRoute(route))
		}

		return child_routes; 
	}else{
		return getRoute(route)
	}

});

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        {componentsRoutes}
        <Redirect to="/dashboard" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
