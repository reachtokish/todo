import { combineReducers } from 'redux';
import actionTypes from './../actionTypes';
import { buckets } from './buckets';
import { todos } from './todos';

const INITIAL_STATE = {
    user: null
};

function currentUser(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                user: action.payload
            }
        default:
            return state;
    }
}

const appReducer = combineReducers({
    currentUser,
    buckets,
    todos
})

const rootReducer = (state, action) => {
	if (action.type === actionTypes.LOGOUT) {
	  	state = undefined
    }
	return appReducer(state, action)
}

export default rootReducer;