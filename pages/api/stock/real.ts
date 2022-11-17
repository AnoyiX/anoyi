import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const prod_code = body.code.join(',')
    const fields = body.fields.join(',')
    const resp = await fetch(`https://api-ddc.wallstcn.com/market/real?prod_code=${prod_code}&fields=${fields}`, { headers: UA.mac })
    const data = await resp.json()
    res.status(200).json(WebResponse.success(data.data))
}