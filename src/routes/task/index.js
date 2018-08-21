import Tasks from './containers/Tasks';
import Task from './containers/Task';
import taskReducer from './taskReducer';

export default {
	title: 'Tasks',
	menu_name: 'Tasks',
	icon: 'fa-credit-card',
	path: '/tasks',
	component: Tasks,
	public: false,
	layout_name: 'layout',
	child_routes: [
		{
			title: 'Task',
			icon: 'fa-credit-card',
			path: '/task',
			component: Task,
			public: false,
			layout_name: 'layout'
		}
	]
}

export {taskReducer}

export * from './TaskActions'