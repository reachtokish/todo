import Dexie from 'dexie';

var db = new Dexie('hellodb');

db.version(1).stores({
    users: "++id,email,password,first_name,last_name,token",
    todos: "++id,title,body,bucket_id,deleted,done",
    bucket: "++id,title,description"
});

export default db;