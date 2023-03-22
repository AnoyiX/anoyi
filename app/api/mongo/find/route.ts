import { NextRequest, NextResponse } from "next/server"
import { WebResponse } from "../../../../utils/web"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const resp = await fetch(`${process.env.MONGODB_API}/action/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGODB_API_KEY || '',
        },
        body: JSON.stringify({
            dataSource: process.env.MONGODB_DATASOURCE,
            ...body,
        })
    })
    const data = await resp.json()
    return NextResponse.json(WebResponse.successList(data.documents, data.documents.length >= body.limit))
}