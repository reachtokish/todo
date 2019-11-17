import { combineReducers } from 'redux';

const INITIAL_STATE = {
    data: 0
};

function userData(state = INITIAL_STATE, action) {
    switch(action.type) {
        case "UPDATE_USER":
            return {
                data: action.payload
            }
        default:
            return state;
    }
}

const appReducer = combineReducers({
    userData: userData
})

export default appReducer;