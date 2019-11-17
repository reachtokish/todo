import actionTypes from './../actionTypes';

export function setCurrentUser(user) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.SET_CURRENT_USER,
            payload: user
        });
        return Promise.resolve();
    }
}