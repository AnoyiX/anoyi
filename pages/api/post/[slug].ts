import type { NextRequest } from 'next/server'
import { parse } from 'node-html-parser'
import UA from '../../../utils/ua'
import { WebResponse } from '../../../utils/web'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {

    const { pathname } = new URL(req.url)
    const slug = pathname.split('/').slice(-1)[0]
    if (!!slug) {
        const resp = await fetch(`https://www.jianshu.com/p/${slug}`, { headers: UA.iphone })
        const text = await resp.text()
        const document = parse(text)
        const elements = document.querySelector('div.note-content').childNodes.map(element => {
            if (element.nodeType === 1) {
                // @ts-ignore
                if (element.rawAttrs === 'class="image-package"') {
                    // @ts-ignore
                    const imgSrc = element.getElementsByTagName('img')[0].getAttribute('data-original-src')
                    return `<img src="${imgSrc}" class="rounded-lg mx-auto min-h-[100px] bg-gray-100" alt="" />`
                }
                return element.toString()
            }
            return ''
        })
        return WebResponse.success({
            id: slug,
            title: document.querySelector('h1.title').childNodes[0].text,
            time: document.querySelector('div.meta > span').childNodes.slice(-1)[0].text,
            author_name: document.querySelector('div.nickname > p.oneline').childNodes[0].text,
            content: elements.filter(item => item !== '').join(''),
        })
    } else {
        return WebResponse.error('slug cannot be null!')
    }

}