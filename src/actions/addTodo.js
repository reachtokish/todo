import actionTypes from './../actionTypes';
import { IDBService } from './../indexedDB';
import { getAllTodo } from './todo';

export function addTodo(data) {
    return function(dispatch) {
        return IDBService.addData("todos", data)
            .then(
                res => {
                    dispatch(getAllTodo());
                    return Promise.resolve();
                }
            )
        // dispatch({
        //     type: actionTypes.SET_CURRENT_USER,
        //     payload: user
        // });
    }
}