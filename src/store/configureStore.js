import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import {routerReducer as routing} from 'react-router-redux'
import {userReducer} from '../components/user'
// import {accountReducer} from '../routes/accounts'
// import {categoryReducer} from '../routes/category'
import {taskReducer} from '../routes/task'

export const rootReducer = combineReducers(
  {
    routing,
    user: userReducer,
    form: formReducer,
    task: taskReducer
    // account : accountReducer,
    // category : categoryReducer,
    // card : cardReducer 
  }
);

const store =  createStore(rootReducer,
  applyMiddleware(
    thunk
  )
);

export default store;
