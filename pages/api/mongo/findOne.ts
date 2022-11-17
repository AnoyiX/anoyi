import type { NextApiRequest, NextApiResponse } from 'next'
import { WebResponse } from '../../../utils/web'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const resp = await fetch(`${process.env.MONGODB_API}/action/findOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGODB_API_KEY,
        },
        body: JSON.stringify({
            dataSource: process.env.MONGODB_DATASOURCE,
            ...body,
        })
    })
    const data = await resp.json()
    res.status(200).json(WebResponse.success(data.document))
}