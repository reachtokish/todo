import actionTypes from './../actionTypes';

const INITIAL_STATE = {
    data: [],
    currentTodo: null
};

export function todos(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SET_TODO:
            return Object.assign({}, state, {
                data: action.payload
            })
        case actionTypes.SET_CURRENT_TODO:
            return Object.assign({}, state, {
                currentTodo: action.payload
            });
        default:
            return state;
    }
}