import type { NextRequest } from 'next/server'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get('cursor')
    const query = cursor ? `first_page=false&cursor=${cursor}` : 'first_page=true'
    const resp = await fetch(`https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&${query}`, { headers: UA.mac })
    const data = await resp.json()
    return WebResponse.success(data.data)
}