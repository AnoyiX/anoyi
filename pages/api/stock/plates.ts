import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const resp_rank = await fetch(`https://flash-api.xuangubao.cn/api/plate/rank?field=${body.rank_field}&type=${body.rank_type}`, { headers: UA.mac })
    const data_rank = await resp_rank.json()
    const codes = body.is_acs ? data_rank.data.slice(0, body.limit) : data_rank.data.slice(-body.limit)
    const plates_code = codes.join(',')
    const data_fields = body.data_fields.join(',')
    const resp = await fetch(`https://flash-api.xuangubao.cn/api/plate/data?plates=${plates_code}&fields=${data_fields}`, { headers: UA.mac })
    const data = await resp.json()
    res.status(200).json(WebResponse.success(data.data))
}