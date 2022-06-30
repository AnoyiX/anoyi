import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    const { vid } = req.query
    fetch(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${vid}&ratio=720p&line=0`, {
        headers: UA.iphone
    }).then(res => {
        if (res.status == 200) {
            resp.status(200).json({
                code: 0,
                message: 'success',
                data: res.url
            })
        } else {
            resp.status(404).json({})
        }
    })
}
