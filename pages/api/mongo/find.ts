import { NextApiRequest, NextApiResponse } from 'next'
import { WebResponse } from '../../../utils/web'

export async function findFromMongo(body: any) {
    const resp = await fetch(`${process.env.MONGODB_API}/action/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGODB_API_KEY,
        },
        body: JSON.stringify({
            dataSource: process.env.MONGODB_DATASOURCE,
            ...body
        })
    })
    const data = await resp.json()
    return data.documents
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const documents = await findFromMongo(body)
    res.status(200).json(WebResponse.successList(documents, documents.length >= body.limit))
}