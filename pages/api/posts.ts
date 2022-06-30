import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../utils/ua'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    const page = req.query.page || 1
    const count = req.query.count || 10
    fetch(`https://www.jianshu.com/asimov/users/slug/7b7ec6f2db21/public_notes?page=${page}&count=${count}&order_by=shared_at`, {
        headers: UA.iphone
    }).then(resp => resp.json()).then(data => {
        const posts = data.map(x => x.object.data)
        resp.status(200).json({
            code: 0,
            message: 'success',
            data: {
                has_more: posts.length >= count,
                data: posts,
            }
        })
    })
}