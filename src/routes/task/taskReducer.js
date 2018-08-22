import {
    TASK_NEW,
    TASK_FETCH_ALL,
    TASK_FETCH,
    TASK_NOT_FOUND,
    TASK_FORM_ERROR,
    TASK_UPDATE,
    TASK_DELETE,
    TASK_FORM_CLEAR,
    TASK_CLEAR_MSG,
    TASK_CLEAR_ERROR
} from './TaskActions';

const INITIAL_STATE = {
    task: null,
    list : [],
    msg: '',
    error: '',
    loading : false
};

export default function taskReducer(state = INITIAL_STATE, action){
    
    switch (action.type){
        case TASK_NEW:
            return {...state, list : [
                    ...state.list,
                    action.task
                   ], msg: 'Task successfully registered', error: '', task : null}
        case TASK_UPDATE:
            return {...state, list: [
                ...state.list,
                action.task
            ], msg: 'Task updated successfully', error: '', task : null}           
        case TASK_DELETE:
            return {...state, list: state.list.filter(e => e.id !== action.id), task : null }; //FIXME: problem with the msg -> , msg : "Account deleted successfully"
        case TASK_FETCH_ALL:
            return {
                ...state,
                list : [...action.tasks]
            }
        case TASK_FETCH: 
            return {...state, task : {...action.task}, erro: '' }
        case TASK_NOT_FOUND:
            return {...state, error: 'Task not found.'}
        case TASK_FORM_ERROR:
            return {...state, error : action.error}
        case TASK_FORM_CLEAR:
            return {...state, task : null}    
        case TASK_CLEAR_MSG:
            return {...state, msg: ''}
        case TASK_CLEAR_ERROR:    
            return {...state, error: ''}
        default:
            return state;
    }
}