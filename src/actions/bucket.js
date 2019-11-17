import actionTypes from './../actionTypes';
import { IDBService } from './../indexedDB';
import { store } from './../store';
import DB from './../dexieConfig';
import { getAllTodo } from './todo';

export function getAllBucket() {
    return function(dispatch) {
        const currentUser = store.getState().currentUser.user;
        return DB.buckets.where('user_id').equals(currentUser.id).toArray(buckets => {
            dispatch({
                type: actionTypes.SET_BUCKET,
                payload: buckets
            });
            if(buckets.length > 0) {
                dispatch(setCurrentBucket(buckets[0]));
            }
            return Promise.resolve();
        });
    }
}

export function pushBucket(bucket) {
    return function(dispatch) {
        const currentBucketList = store.getState().buckets.data;
        currentBucketList.push(bucket);
        dispatch({
            type: actionTypes.SET_BUCKET,
            payload: currentBucketList
        });
        if(currentBucketList.length === 1) {
            dispatch(setCurrentBucket(bucket));
        }
    }
}

export function setCurrentBucket(bucket) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.SET_CURRENT_BUCKET,
            payload: bucket
        });
        return Promise.resolve();
    }
}

export function deleteBucket(bucket) {
    return function(dispatch) {
        DB.buckets
            .where("id").equals(bucket.id)
            .delete()
            .then(function (deleteCount) {
                DB.todos
                    .where("bucket_id").equals(bucket.id)
                    .delete()
                    .then(function (deleteCount) {
                        dispatch(getAllBucket())
                            .then(
                                res => {
                                    dispatch(getAllTodo());
                                }
                            )
                    })
            });
    }
}