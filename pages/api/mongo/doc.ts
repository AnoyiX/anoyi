import { NextApiRequest, NextApiResponse } from 'next'
import MongoPromise from '../../../utils/mongo'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {

    const { db, collection, query, projection } = req.body

    MongoPromise.then(mongo => {
        mongo.db(db).collection(collection).findOne(query, { projection }).then(data => {
            resp.status(200).json({
                code: 0,
                message: 'success',
                data
            })
        })
    })

}

// if body.query.get('_id'):
// body.query['_id'] = ObjectId(body.query.get('_id'))
// doc = mongo[body.db][body.collection].find_one(body.query, body.projection)
// if doc.get('_id'):
// doc['_id'] = str(doc.get('_id'))
// return Response(data=doc)