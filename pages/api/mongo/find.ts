import type { NextRequest } from 'next/server'
import { WebResponse } from '../../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

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

export default async function handler(req: NextRequest) {
    const body = await req.json()
    const documents = await findFromMongo(body)
    return WebResponse.successList(documents, documents.length >= body.limit)
}