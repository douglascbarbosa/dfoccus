//Define all routes that will be used on the app!
export default [
	require('./dashboard').default,
	require('./auth').default,
	require('./week').default,
	require('./task').default,
];	

