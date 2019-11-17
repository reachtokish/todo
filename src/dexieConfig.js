import Dexie from 'dexie';

var db = new Dexie('hellodb');

db.version(1).stores({
    users: "++id,email,password,first_name,last_name,token",
    todos: "++id,title,body,bucket_id,deleted,done,bucket_id,user_id",
    buckets: "++id,title,description,user_id"
});

export default db;