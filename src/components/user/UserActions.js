import database, {firebase} from '../../firebase/firebase'
import history from '../../routes/History';
import store from '../../store/configureStore';
import AppStorage, {ONION_STR_LOGIN} from '../../components/utils/AppStorage'

export const USER_INFO = 'USER_INFO';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';

/**
 * Action responsable to make the login of the user
 * @param {Object} values //Object with email/passowrd/keep
 */
export const loginUser = (values) => {
    return (dispatch) => {
        //Initiating the user login!
        dispatch({ type: LOGIN_USER });
        //User firebase to make the login and take user information!
        return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(user => {
                if (user) {

                    //Take user info!
                    database.ref(`/users/${user.uid}`).once("value")
                        .then((snapshot) => {
                            const usrInfo = snapshot.val();
                            
                            usrInfo.password = window.btoa(values.password);

                            loginUserSuccess(dispatch, usrInfo, values.keep) 

                        })
                }
                    
            })
            .catch(error => {
                console.log('Login erro code', error.code);
                console.log('Login erro message', error);
                loginUserFail(dispatch, error.message);
            })
  
    };
};

/**
 * Action responsable to register a new user on the firebase
 * @param {Object} values //Object with name/email/password
 */
export const registerUser = (values) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_USER });

        return firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then(user => {
            
            if (user) {

                let usrInfo = {
                    email: values.email,
                    uid : user.uid,
                    username: values.name,
                }

                database.ref('users/' + user.uid).set(usrInfo);
                
                usrInfo.password = window.btoa(values.password);

                loginUserSuccess(dispatch, usrInfo) 
            }
        })
        .catch((error) => {
            console.log('Register erro code', error.code);
            console.log('Register erro message', error.message);
            registerUserFail(dispatch, error.message);
        });

        return true;
    }
}

const loginUserSuccess = (dispatch, user, keepLoginInfo = false, pathname = '/dashboard') => {

    //Store the user info to keep the user session!
    if (keepLoginInfo){
        AppStorage.add(ONION_STR_LOGIN, user);
    }

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    history.push(pathname);

};  

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL, error})	
};

const registerUserFail = (dispatch, error) => {
	dispatch({ type: REGISTER_USER_FAIL, error})	
};

/**
 * This function is responsable to try to recover a user session when he click on Remember Me!
 * @param {function} renderApp //Function to render the app
 * @param {function} dispatch //Function to dispatch info to store
 */
export const tryRecoverLoginSession = (renderApp, dispatch) => {
    const pathname = window.location.pathname;
    const userInfo = AppStorage.getValue(ONION_STR_LOGIN);

    if (userInfo !== null){

        return firebase.auth().signInWithEmailAndPassword(userInfo.email, window.atob(userInfo.password))
        .then(user => {
            if (user) {
                //Render the app!
                renderApp();
                loginUserSuccess(dispatch, userInfo, true, pathname);
                
            }
                
        })
        .catch(error => {
            //Clear the login session!
            AppStorage.clearValue(ONION_STR_LOGIN);
            //Render the app!
            renderApp();
        })
        
    }else{
        //Render the app!
        renderApp();
    }

}

/**
 * Function responsable to logout the user!
 */
export const logout = () => {

    //Clear the login session!
    AppStorage.clearValue(ONION_STR_LOGIN);

    store.dispatch({type:LOGOUT_USER});

    history.push('/login');
    
}
