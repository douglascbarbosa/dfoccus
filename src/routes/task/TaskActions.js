import database, {getUserPath} from '../../firebase/firebase';
import history from '../../routes/History';

export const TASK_NEW         = 'TASK_NEW';
export const TASK_UPDATE      = 'TASK_UPDATE';
export const TASK_DELETE      = 'TASK_DELETE';
export const TASK_FETCH_ALL   = 'TASK_FETCH_ALL';
export const TASK_FETCH       = 'TASK_FETCH';
export const TASK_NOT_FOUND   = 'TASK_NOT_FOUND';
export const TASK_LIST_ERROR  = 'TASK_LIST_ERROR';
export const TASK_FORM_ERROR  = 'TASK_FORM_ERROR';
export const TASK_FORM_CLEAR  = 'TASK_FORM_CLEAR';
export const TASK_LAODING     = 'TASK_LAODING';
export const TASK_CLEAR_MSG   = 'TASK_CLEAR_MSG';
export const TASK_CLEAR_ERROR = 'TASK_CLEAR_ERROR';

const task_path = `tasks`;

export const new_task = (values) =>{

    return (dispatch, getState) => {

        dispatch({type: TASK_LAODING});

        const task = {
            name : values.name,
            closing_day : values.closing_day,
            payment_day : values.payment_day,
            limit : parseFloat(values.limit.replace('.', '').replace(',','.')).toFixed(2)
        }

        return database.ref(`/users/${getState().user.uid}/${task_path}`)
            .push(task)
            .then(ref => {
                dispatch({
                    type: TASK_NEW,
                    task : {
                        id : ref.key,
                        ...task
                    }
                });

                //After add a new card, redirect to the account list page!
                history.push('/tasks');
        })
        .catch(error => {
            dispatch({
                type: TASK_FORM_ERROR,
                error : error.message
            })
        });
        
    }
}

export const update_task = (id, values) => {

    return (dispatch, getState) => {

        dispatch({type: TASK_LAODING});
        
        const task = {
            name : values.name,
            closing_day : values.closing_day,
            payment_day : values.payment_day,
            limit : parseFloat(values.limit.replace('.', '').replace(',','.')).toFixed(2)
        }

        return database.ref(`/users/${getState().user.uid}/${task_path}/${id}`)
            .update(task)
            .then(ref => {
                dispatch({
                    type: TASK_UPDATE,
                    account : {
                        id,
                        ...task
                    }
                });

                //After update the card, redirect to the account list page!
                history.push('/tasks');
        })
        .catch(error => {
            dispatch({
                type: TASK_FORM_ERROR,
                error : error.message
            })
        });
        
    }    
}

export const delete_task = (id) => {

    return (dispatch, getState) => {

        return database.ref(`/users/${getState().user.uid}/${task_path}/${id}`)
            .remove()
            .then(() => {

                dispatch({
                    type: TASK_DELETE,
                    id
                });
                
        })
        .catch(error => {
            dispatch({
                type: TASK_LIST_ERROR,
                error : error.message
            })
        });
        
    }    

}


export const fetch_tasks = () => {
    return (dispatch, getState ) => {
        return database.ref(`/users/${getState().user.uid}/${task_path}`).once('value').then(snapshot => {
            const tasks = [];    

            snapshot.forEach(childSnapshot => {
                tasks.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
          dispatch({
              type: TASK_FETCH_ALL,
              tasks
          })  
        });
    }
}

export const fetch_task = (id) => {
    return (dispatch, getState ) => {
        return database.ref(`/users/${getState().user.uid}/${task_path}/${id}`).once('value').then(snapshot => {
            //Check if the account exist!
            if (snapshot.exists()){
                const task = snapshot.val();

                dispatch({
                    type: TASK_FETCH,
                    task
                });
                 
            }else{
                dispatch({
                    type: TASK_NOT_FOUND
                });

                //If the card doesn't exist, I'll redirect to the list!
                history.push('/tasks');
                
            }
        })
        .catch(error => {

            dispatch({
                type: TASK_LIST_ERROR,
                error : error.message
            })

            //If the card doesn't exist, I'll redirect to the list!
            history.push('/tasks');
            
        });
    }
}

export const clear_form_task = () => {
    return (dispatch) => {
        dispatch({type: TASK_FORM_CLEAR})
    }

}

export const clear_message = (type) => {
    return dispatch => {
        console.log('limpando erro', type);

        if (type === 'M'){
            dispatch({
                type: TASK_CLEAR_MSG
            })
        }else{
            dispatch({
                type: TASK_CLEAR_ERROR
            })
        }

    }
}