import type { NextRequest } from 'next/server'
import UA from '../../utils/ua'
import { WebResponse } from '../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const resp = await fetch(`https://www.jianshu.com/users/7b7ec6f2db21/notebooks?slug=7b7ec6f2db21`, { headers: UA.iphone })
    const data = await resp.json()
    return WebResponse.success(data.notebooks)
}