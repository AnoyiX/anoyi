import type { NextRequest } from 'next/server'
import UA from '../../utils/ua'
import { WebResponse } from '../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || 1
    const count = searchParams.get('count') || 10
    const resp = await fetch(`https://www.jianshu.com/asimov/users/slug/7b7ec6f2db21/public_notes?page=${page}&count=${count}&order_by=shared_at`, { headers: UA.iphone })
    const data = await resp.json()
    const posts = data.map(x => x.object.data)
    return WebResponse.successList(posts, posts.length >= count)
}