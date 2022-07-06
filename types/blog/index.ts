export type TBlog = {
    commentable: boolean
    first_shared_at: string
    id: number
    is_top: boolean
    likes_count: number
    list_image_url: string
    paid: boolean
    public_abbr: string
    public_comments_count: number
    slug: string
    title: string
    total_fp_amount: number
    total_rewards_count: number
    user: {
        avatar: string
        id: number
        nickname: string
        slug: string
    }
    views_count: number
}


export type TBlogArticle = {
    id: string
    content: string
    title: string
    time: string
    author_name: string
}