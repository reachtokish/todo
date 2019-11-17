import { combineReducers } from 'redux';
import actionTypes from './../actionTypes';

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
    currentUser
})

export default appReducer;