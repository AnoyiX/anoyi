'use client'

import InfiniteScrollLoader from "@/components/client/InfiniteScrollLoader"
import useSWRInfiniteScroll from "@/hooks/useSWRInfiniteScroll"
import { SWRInfiniteOptions } from "@/lib/constant"
import { Link } from "next-view-transitions"
import http from "../../../utils/http"
import { TRepo } from "./type"
import { RiGitForkLine, RiRecordCircleLine, RiStarLine } from "@remixicon/react"

const limit = 12
const getKey = (pageIndex: number, previousPageData: TRepo[]) => {
    if (previousPageData && previousPageData.length < limit) return null
    return `https://api.github.com/users/AnoyiX/starred?page=${pageIndex + 1}&per_page=${limit}`
}

export function Repos() {
    const { data, showLoading, sentryRef } = useSWRInfiniteScroll<TRepo[]>(
        getKey,
        http.getAll,
        SWRInfiniteOptions,
        data => data.length > 0 && data[data.length - 1]?.length >= limit
    )

    return (
        <>
            <div className="w-full grid grid-cols-1 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-2">
                {
                    data.map(array => array.map(item => (
                        <div key={item.id} className="box flex w-full rounded-lg p-4 gap-4 md:gap-6">
                            <a href={item.owner.html_url} target="_blank" rel='noreferrer' className="h-fit">
                                <img width={48} height={48} src={item.owner.avatar_url} alt="" className="rounded-xl" />
                            </a>
                            <div className="flex-1">
                                <Link href={item.html_url} target="_blank" rel='noreferrer' className="font-semibold hover:text-blue-600">{item.full_name}</Link>
                                <div className="flex-row-center gap-3 text-xs cursor-default my-3 text-gray-500">
                                    <div className="flex-row-center">
                                        <RiStarLine className="mr-1 w-4" />
                                        {item.stargazers_count.toLocaleString()}
                                    </div>
                                    <div className="flex-row-center">
                                        <RiGitForkLine className="mr-1 w-4" />
                                        {item.forks.toLocaleString()}
                                    </div>
                                    <div className="flex-row-center">
                                        <RiRecordCircleLine className="mr-1 w-4" />
                                        {item.open_issues.toLocaleString()}
                                    </div>
                                </div>
                                <p className="text-sm font-sans text-gray-700">{item.description}</p>
                                <div className="text-gray-600 flex flex-row gap-2 text-xs flex-wrap mt-3">
                                    {
                                        item.topics.map(topic => (
                                            <a key={topic} href={`https://github.com/topics/${topic}`} target="_blank" rel='noreferrer' className="a-tag">
                                                {topic}
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>
            <InfiniteScrollLoader sentryRef={sentryRef} showLoading={showLoading} />
        </>
    )
}