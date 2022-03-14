import { useEffect, useState } from "react"
import http from "../utils/http"

interface IDoc {
    slug: string
    title: string
    content: string
}


export default function useDoc(slug: string) {

    const [doc, setDoc] = useState<IDoc>({ slug: '', title: '', content: '' })

    useEffect(() => {
        if (!!slug) {
            http.post(`/api/mongo/doc`, {
                db: 'anoyi',
                collection: 'docs',
                query: { slug },
                projection: { _id: 0 },
            }).then(data => setDoc(data))
        }
    }, [slug])

    return {
        doc,
    }

}