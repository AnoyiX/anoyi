import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get('cursor')
    const query = cursor ? `first_page=false&cursor=${cursor}` : 'first_page=true'
    const resp = await fetch(`https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&${query}`, { headers: UA.mac })
    const data = await resp.json()
    res.status(200).json(WebResponse.success(data.data))
}