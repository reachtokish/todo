import actionTypes from './../actionTypes';

const INITIAL_STATE = {
    data: [],
    currentBucket: null
};

export function buckets(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SET_BUCKET:
            return Object.assign({}, state, {
                data: action.payload
            })
        case actionTypes.SET_CURRENT_BUCKET:
            return Object.assign({}, state, {
                currentBucket: action.payload
            });
        default:
            return state;
    }
}