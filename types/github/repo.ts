export type TRepo = {
    id: number
    name: string
    full_name: string
    private: boolean
    owner: {
        login: string
        id: number
        avatar_url: string
        html_url: string
        type: string
    },
    html_url: string
    description: string
    updated_at: string
    pushed_at: string
    size: number,
    stargazers_count: number
    language: string
    license: {
        key: string
        name: string
        spdx_id: string
    },
    topics: string[]
    forks: number
    open_issues: number
    watchers: number
}