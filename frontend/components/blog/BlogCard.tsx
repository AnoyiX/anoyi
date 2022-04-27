import { IBlog } from "../../hooks/useBlogs"

interface BlogCardProps {
    blog: IBlog
}

export default function BlogCard({ blog }: BlogCardProps) {

    return (
        <div className="w-full flex flex-col lg:flex-row py-4 gap-2">
            <img src={blog.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240'} alt="" className="rounded-lg cursor-pointer hover:opacity-75 w-64 h-40 object-cover" />
            <div className="flex flex-col p-2 justify-between">
                <div className="flex flex-col gap-2">
                    <div className="text-black text-xl cursor-pointer hover:text-blue-600">
                        {blog.title}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {blog.first_shared_at.substring(0, 19).replace('T', ' ')}
                    </div>
                    <div className="text-gray-600 text-sm">
                        {blog.public_abbr}
                    </div>
                </div>
                <div className="text-blue-400 flex flex-row gap-2">
                    <div className="border border-blue-400 rounded py-1 px-2 text-sm cursor-default">
                        阅读 {blog.views_count}
                    </div>
                    <div className="border border-blue-400 rounded py-1 px-2 text-sm cursor-default">
                        评论 {blog.public_comments_count}
                    </div>
                    <div className="border border-blue-400 rounded py-1 px-2 text-sm cursor-default">
                        喜欢 {blog.likes_count}
                    </div>
                </div>
            </div>
        </div>
    )
}
