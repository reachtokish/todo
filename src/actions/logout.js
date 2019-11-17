import actionTypes from './../actionTypes';
import { history } from './../history';

export function logout() {
    return function(dispatch) {
        dispatch({
            type: actionTypes.LOGOUT,
            payload: null
        });
        localStorage.clear();
        history.push(`${process.env.PUBLIC_URL}/`);
    }
}