import Link from "next/link"
import { TBlog } from "../../types/blog"

export default function BlogCard({ blog }: {blog: TBlog}) {

    return (
        <div className="w-full flex flex-row py-4 gap-2">
            <a href={`https://www.jianshu.com/p/${blog.slug}`} target='_blank' rel='noreferrer'>
                <img src={blog.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/256/h/160'} alt="" className="rounded-lg cursor-pointer hover:opacity-75 w-64 h-40 object-cover bg-slate-200" />
            </a>
            <div className="flex flex-col p-2 justify-between">
                <div className="flex flex-col gap-2">
                    <a href={`https://www.jianshu.com/p/${blog.slug}`} target='_blank' rel='noreferrer'>
                        <div className="text-black text-xl cursor-pointer hover:text-blue-600">
                            {blog.title}
                        </div>
                    </a>
                    <div className="text-gray-400 text-sm">
                        {blog.first_shared_at.substring(0, 19).replace('T', ' ')}
                    </div>
                    <div className="text-gray-600 text-sm">
                        {blog.public_abbr}
                    </div>
                </div>
                <div className="text-gray-600 flex flex-row gap-3 text-xs cursor-default">
                    <div className="cursor-default">
                        <i className="fa-regular fa-eye mr-1"></i>
                        {blog.views_count.toLocaleString()}
                    </div>
                    <div className="cursor-default">
                        <i className="fa-regular fa-comment mr-1"></i>
                        {blog.public_comments_count.toLocaleString()}
                    </div>
                    <div className="cursor-default">
                        <i className="fa-regular fa-heart mr-1"></i>
                        {blog.likes_count.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )

}
