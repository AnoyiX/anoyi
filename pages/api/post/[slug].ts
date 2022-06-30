import { NextApiRequest, NextApiResponse } from 'next'
import UA from '../../../utils/ua'
import { parse } from 'node-html-parser'

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
    const { slug } = req.query
    fetch(`https://www.jianshu.com/p/${slug}`,
        { headers: UA.iphone }
    ).then(resp => resp.text()).then(text => {
        const document = parse(text)
        const elements = document.querySelector('div.note-content').childNodes.map(element => {
            if (element.nodeType === 1) {
                // @ts-ignore
                if (element.rawAttrs === 'class="image-package"') {
                    // @ts-ignore
                    return '<img src="' + element.getElementsByTagName('img')[0].getAttribute('data-original-src') + '" class="rounded-lg mx-auto min-h-[100px] bg-gray-100" alt=""/>'
                }
                return element.toString()
            }
            return ''
        })
        resp.status(200).json({
            code: 0,
            message: 'success',
            data: {
                id: slug,
                title: document.querySelector('h1.title').childNodes[0].text,
                time: document.querySelector('div.meta > span').childNodes.slice(-1)[0].text,
                author_name: document.querySelector('div.nickname > p.oneline').childNodes[0].text,
                content: elements.filter(item => item !== '').join(''),
            }
        })
    })
}