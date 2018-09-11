import database, {getUserPath} from '../../firebase/firebase';
import history from '../History';
import moment from 'moment';

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

export const new_task = (values, redirect = '/tasks') =>{

    return (dispatch, getState) => {

        dispatch({type: TASK_LAODING});

        // let dow = false;
        // //Take the days to repeat!
        // if (values.weekDay){
        //   dow = [];
        //   values.weekDay.forEach((day, index) => {
        //       dow.push(index);
        //   })
        // }

        // const task = {
        //     title : values.title,
        //     start : moment(values.start).format(),
        //     end : moment(values.end).format(),
        //     frequence: values.frequence || false,
        //     repeat: values.repeat || false,
        //     dow 
        // }


        const task = {
            title:"My repeating event",
            id: 1,
            start: '10:00', // a start time (10am in this example)
            end: '14:00', // an end time (6pm in this example)
            dow: [ 1, 4 ], // Repeat monday and thursday
            ranges: [{ //repeating events are only displayed if they are within one of the following ranges.
                start: moment().startOf('week').format(), //next two weeks
                end: moment().add(3,'w').format(),
            }],
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
                history.push(redirect);
        })
        .catch(error => {
            dispatch({
                type: TASK_FORM_ERROR,
                error : error.message
            })
        });
        
    }
}

export const update_task = (id, values, redirect = '/tasks') => {

    return (dispatch, getState) => {

        dispatch({type: TASK_LAODING});
        
        const task = {
            title : values.title,
            start : moment(values.start).format(),
            end : moment(values.end).format(),
        }

        return database.ref(`/users/${getState().user.uid}/${task_path}/${id}`)
            .update(task)
            .then(ref => {
                dispatch({
                    type: TASK_UPDATE,
                    task : {
                        id,
                        ...task
                    }
                });

                //After update the card, redirect to the account list page!
                history.push(redirect);
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