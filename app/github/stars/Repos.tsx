'use client'

import { Link } from "next-view-transitions"
import InfiniteScroll from "react-infinite-scroll-component"
import useSWRInfinite from 'swr/infinite'
import { ForkIcon, IssueIcon, LicenseIcon, Loading, StarIcon } from "../../../components/Icons"
import http from "../../../utils/http"
import { TRepo } from "./type"


export function Repos() {

    const limit = 12
    const genAPI = (page: number) => `https://api.github.com/users/AnoyiX/starred?page=${page + 1}&per_page=${limit}`

    const getKey = (pageIndex: number, previousPageData: TRepo[]) => {
        if (previousPageData && !previousPageData.length) return null
        return genAPI(pageIndex)
    }
    const { data = [], size, setSize } = useSWRInfinite<TRepo[]>(getKey, http.getAll)

    return (
        <InfiniteScroll
            className="w-full grid grid-cols-1 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-2"
            dataLength={new Array<TRepo>().concat.apply([], data.map(resp => resp)).length}
            next={() => setSize(size + 1)}
            hasMore={!data.length || data.slice(-1)[0].length >= limit}
            loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
        >
            {
                data.map(resp => resp.map(item => (
                    <div key={item.id} className="box flex w-full rounded-lg p-4 gap-4 md:gap-6">
                        <a href={item.owner.html_url} target="_blank" rel='noreferrer' className="h-fit">
                            <img width={48} height={48} src={item.owner.avatar_url} alt="" className="rounded-xl" />
                        </a>
                        <div className="flex-1">
                            <Link href={item.html_url} target="_blank" rel='noreferrer' className="font-semibold hover:text-blue-600">{item.full_name}</Link>
                            <div className="flex-row-center gap-3 text-xs cursor-default my-3 text-gray-500">
                                <div className="flex-row-center">
                                    <StarIcon className="mr-1" />
                                    {item.stargazers_count.toLocaleString()}
                                </div>
                                <div className="flex-row-center">
                                    <ForkIcon className="mr-1" />
                                    {item.forks.toLocaleString()}
                                </div>
                                <div className="flex-row-center">
                                    <IssueIcon className="mr-1" />
                                    {item.open_issues.toLocaleString()}
                                </div>
                                {
                                    item.license && (
                                        <div className="flex-row-center">
                                            <LicenseIcon className="mr-1" />
                                            {item.license.spdx_id}
                                        </div>
                                    )
                                }
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
                        {/* <Divider />
                            <CardFooter className="flex items-center justify-between">
                                {
                                    item.language && (
                                        <Chip size="sm" className="cursor-default text-xs" style={Object.keys(colors).includes(item.language) ? { backgroundColor: colors[item.language] } : {}}>
                                            {item.language}
                                        </Chip>
                                    )
                                }
                            </CardFooter> */}
                    </div>

                )))
            }
        </InfiniteScroll>
    )
}