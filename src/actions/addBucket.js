import actionTypes from './../actionTypes';
import { IDBService } from './../indexedDB';
import { pushBucket } from './../actions/bucket';

export function addBucket(data) {
    return function(dispatch) {
        return IDBService.addData("buckets", data)
            .then(
                res => {
                    dispatch(pushBucket(res));
                    return Promise.resolve();
                }
            )
    }
}