import DB from './dexieConfig';

async function addData(table, data) {
    const toReturn  = await DB[table]
                        .put(data)
                        .then((id) => {
                            return DB[table].get(id);
                        })
                        .catch (err => {
                            console.log(err);
                        });
    
                        return toReturn;
}

async function findWhere(table, column, value) {
    return new Promise((resolve, reject) => {
        DB[table]
            .where(column)
            .equals(value)
            .each(friend => {
                resolve(friend);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
    })
}

export const IDBService = {
    addData,
    findWhere
}