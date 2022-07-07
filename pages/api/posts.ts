import type { NextRequest } from 'next/server'
import UA from '../../utils/ua'
import { WebResponse } from '../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export async function getFromJianShu(page: string | number, limit: string | number) {
    const resp = await fetch(`https://www.jianshu.com/asimov/users/slug/7b7ec6f2db21/public_notes?page=${page}&count=${limit}&order_by=shared_at`, { headers: UA.iphone })
    const data = await resp.json()
    return data.map(x => x.object.data)
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || 1
    const count = searchParams.get('count') || 10
    const data = await getFromJianShu(page, count)
    return WebResponse.successList(data, data.length >= count)
}