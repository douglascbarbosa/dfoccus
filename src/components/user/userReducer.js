
import {
  USER_INFO,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL  
} from './UserActions'


const INITIAL_STATE = {
  email: '',
  uid : '',
  username: '',
  error: '',
	loading: false
};


export default function userReducer (state = INITIAL_STATE, action ){
  switch (action.type){
    case USER_INFO:
      return {...state, username: action.data.nome };
    case LOGIN_USER_SUCCESS: 
			return {...state, ...action.payload };
    case LOGIN_USER_FAIL:
      return {...state, loading: false, password: '', error: 'User authentication failed: ' + action.error}  
    case REGISTER_USER:
      return {...state, loading: true, error: '' }  
    case REGISTER_USER_FAIL:
      return {...state, loading: false, password: '', error: 'User registration failed: ' + action.error}  
    default:
      return state
  }

}