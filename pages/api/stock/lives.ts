import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    const { cursor } = req.query
    const query = cursor ? `first_page=false&cursor=${cursor}` : 'first_page=true'
    fetch(`https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&${query}`, {
        headers: UA.mac
    }).then(resp => resp.json()).then(data => {
        resp.status(200).json({
            code: 0,
            message: 'success',
            data: data.data,
        })
    })
}