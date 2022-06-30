import { NextApiRequest, NextApiResponse } from 'next'
import MongoPromise from '../../../utils/mongo'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    fetch(req.body.url, {
        headers: req.body.headers
    }).then(resp => resp.json()).then(data => {
        if (data.status_code === 0) {
            MongoPromise.then(conn => {
                data.aweme_list.forEach(item => {
                    item['collect_time'] = new Date().getTime()
                    conn.db('cloud').collection('videos').updateOne({
                        aweme_id: item.aweme_id,
                    }, {
                        '$set': item
                    }, {
                        upsert: true
                    })
                })
            })
        }
        resp.status(200).json({
            code: 0,
            message: 'success',
            data: {}
        })
    })
}