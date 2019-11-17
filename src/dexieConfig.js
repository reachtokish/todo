import Dexie from 'dexie';

var db = new Dexie('hellodb');

db.version(1).stores({
    users: "++id,email,password,first_name,last_name,token",
    todos: "++id,title,description,bucket_id,is_done,user_id,date_added",
    buckets: "++id,title,user_id,date_added"
});

export default db;