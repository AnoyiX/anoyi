import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    const prod_code = req.body.code.join(',')
    const fields = req.body.fields.join(',')
    fetch(`https://api-ddc.wallstcn.com/market/real?prod_code=${prod_code}&fields=${fields}`, {
        headers: UA.mac
    }).then(resp => resp.json()).then(data => {
        resp.status(200).json({
            code: 0,
            message: 'success',
            data: data.data,
        })
    })
}