import {db} from '../db/db.js'


export const withTransaction = async (callback) =>{
    return await db.transaction(async (trx) => {
        return await callback(trx);
    })
}