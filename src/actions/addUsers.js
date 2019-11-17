import { IDBService } from './../indexedDB';

export function registerUser(table, data) {
    IDBService.addData(table, data);
}