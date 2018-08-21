import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase/firebase';
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import store from './store/configureStore'
import AppRouter from './routes/AppRouter';

import LoadingPage from './components/common/LoadingPage';
import AppStorage, {ONION_STR_LOGIN} from './components/utils/AppStorage';
import {tryRecoverLoginSession} from './components/user/UserActions';

let hasRendered = false;

const renderApp = () => {
	if (!hasRendered) {

		ReactDOM.render( (
			<Provider store={store}>
				<AppRouter />
			</Provider>
		), document.getElementById('root'));
	  
	  hasRendered = true;
	}
  };

ReactDOM.render(<LoadingPage show />, document.getElementById('root'));

tryRecoverLoginSession(renderApp, store.dispatch);

registerServiceWorker();
	

