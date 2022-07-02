import type { NextRequest } from 'next/server'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const body = await req.json()
    const prod_code = body.code.join(',')
    const fields = body.fields.join(',')
    const resp = await fetch(`https://api-ddc.wallstcn.com/market/real?prod_code=${prod_code}&fields=${fields}`, { headers: UA.mac })
    const data = await resp.json()
    return WebResponse.success(data.data)
}