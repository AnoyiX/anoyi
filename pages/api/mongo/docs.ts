import { NextApiRequest, NextApiResponse } from 'next'
import MongoPromise from '../../../utils/mongo'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {

    const { limit, skip, db, collection, query, projection, sort } = req.body

    MongoPromise.then(mongo => {
        mongo.db(db).collection(collection).countDocuments(query, {}).then(total => {
            mongo.db(db).collection(collection).find(query, { sort, projection }).sort(sort).skip(skip).limit(limit).toArray().then(data => {
                resp.status(200).json({
                    code: 0,
                    message: 'success',
                    data: {
                        skip: skip,
                        limit: limit,
                        total: total,
                        has_more: total > skip + limit,
                        data
                    }
                })
            })
        })
    })

}