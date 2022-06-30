import Link from "next/link"
import { IBlog } from "../../hooks/useBlogs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faComment, faHeart } from '@fortawesome/free-regular-svg-icons'

interface BlogCardProps {
    blog: IBlog
}

export default function BlogCard({ blog }: BlogCardProps) {

    return (
        <div className="w-full flex flex-row py-4 gap-2">
            <Link href={`/blog/${blog.slug}`}>
                <img src={blog.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/256/h/160'} alt="" className="rounded-lg cursor-pointer hover:opacity-75 w-64 h-40 object-cover bg-slate-200" />
            </Link>
            <div className="flex flex-col p-2 justify-between">
                <div className="flex flex-col gap-2">
                    <Link href={`/blog/${blog.slug}`}>
                        <div className="text-black text-xl cursor-pointer hover:text-blue-600">
                            {blog.title}
                        </div>
                    </Link>
                    <div className="text-gray-400 text-sm">
                        {blog.first_shared_at.substring(0, 19).replace('T', ' ')}
                    </div>
                    <div className="text-gray-600 text-sm">
                        {blog.public_abbr}
                    </div>
                </div>
                <div className="text-gray-600 flex flex-row gap-3 text-xs cursor-default">
                    <div className="cursor-default">
                        <FontAwesomeIcon icon={faEye} className="mr-1"/>
                        {blog.views_count}
                    </div>
                    <div className="cursor-default">
                        <FontAwesomeIcon icon={faComment} className="mr-1"/>
                        {blog.public_comments_count}
                    </div>
                    <div className="cursor-default">
                        <FontAwesomeIcon icon={faHeart} className="mr-1"/> 
                        {blog.likes_count}
                    </div>
                </div>
            </div>
        </div>
    )
}
