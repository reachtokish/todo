import actionTypes from './../actionTypes';
import { IDBService } from './../indexedDB';
import { store } from './../store';
import DB from './../dexieConfig';

export function getAllTodo() {
    return function(dispatch) {
        const currentUser = store.getState().currentUser.user;
        const currentBucket = store.getState().buckets.currentBucket;
        DB.todos.where('user_id').equals(currentUser.id).toArray(todos => {
            dispatch({
                type: actionTypes.SET_TODO,
                payload: todos.filter(el => {
                    return el.bucket_id === currentBucket.id;
                })
            });
        });
    }
}

export function deleteTodo(todo) {
    return function(dispatch) {
        DB.todos
            .where("id").equals(todo.id)
            .delete()
            .then(function (deleteCount) {
                dispatch(getAllTodo());
            });
    }
}

export function setCurrentTodo(todo) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.SET_CURRENT_TODO,
            payload: todo
        });
        return Promise.resolve();
    }
}