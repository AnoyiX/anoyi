import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    fetch(`https://flash-api.xuangubao.cn/api/plate/rank?field=${req.body.rank_field}&type=${req.body.rank_type}`, {
        headers: UA.mac
    }).then(resp => resp.json()).then(data => {
        const codes = req.body.is_acs ? data.data.slice(0, req.body.limit) : data.data.slice(-req.body.limit)
        const plates_code = codes.join(',')
        const data_fields = req.body.data_fields.join(',')
        fetch(`https://flash-api.xuangubao.cn/api/plate/data?plates=${plates_code}&fields=${data_fields}`, {
            headers: UA.mac
        }).then(resp => resp.json()).then(data => {
            resp.status(200).json({
                code: 0,
                message: 'success',
                data: data.data,
            })
        })
    })
}