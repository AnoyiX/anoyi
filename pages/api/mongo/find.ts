import type { NextRequest } from 'next/server'
import { WebResponse } from '../../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const body = await req.json()
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
    return WebResponse.successList(data.documents, data.documents.length >= body.limit)
}