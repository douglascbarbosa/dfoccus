import Weeks from './containers/Weeks';
import Week from './containers/Week';
import weekReducer from './weekReducer';

export default {
	title: 'Week plans',
	menu_name: 'Week',
	icon: 'fa-calendar',
	path: '/weeks',
	component: Weeks,
	public: false,
	layout_name: 'layout',
	child_routes: [
		{
			title: 'Week plan',
			icon: 'fa-calendar',
			path: '/week',
			component: Week,
			public: false,
			layout_name: 'layout'
		}
	]
}

export {weekReducer}

export * from './WeekActions'