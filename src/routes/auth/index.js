import Login from './containers/Login';
import Register from './containers/Register';

export default {
	child_routes:[ 
		{
			path: '/login',
			component: Login,
			public: true,
			layout_name: 'layout_blank'

		},
		{
			path: '/register',
			component: Register,
			public: true,
			layout_name: 'layout_blank'
		}
	]
}