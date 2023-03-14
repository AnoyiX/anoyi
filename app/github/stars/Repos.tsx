'use client'

import InfiniteScroll from "react-infinite-scroll-component"
import useSWRInfinite from 'swr/infinite'
import http from "../../../utils/http"
import { Loading } from "../../../components/Icons"
import ImageSkeleton from "../../../components/client/ImageSkeleton"
import { TRepo } from "./type"


export default function Repos({ colors }) {

    const limit = 12
    const genAPI = (page: number) => `https://api.github.com/users/AnoyiX/starred?page=${page + 1}&per_page=${limit}`

    const getKey = (pageIndex: number, previousPageData: TRepo[]) => {
        if (previousPageData && !previousPageData.length) return null
        return genAPI(pageIndex)
    }
    const { data = [], size, setSize } = useSWRInfinite<TRepo[]>(getKey, http.getAll)

    return (

        <InfiniteScroll
            className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 md:grid-cols-2"
            dataLength={[].concat.apply([], data.map(resp => resp)).length}
            next={() => setSize(size + 1)}
            hasMore={!data.length || data.slice(-1)[0].length >= limit}
            loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
        >
            {
                data.map(resp => resp.map(item => (
                    <div key={item.id} className="flex border w-full rounded-lg p-4 gap-4 md:gap-6">
                        <div className="flex-0 text-center">
                            <a href={item.owner.html_url} target="_blank" rel='noreferrer'>
                                <ImageSkeleton src={item.owner.avatar_url} className="h-14 w-14 rounded-lg" />
                            </a>
                        </div>
                        <div className="flex-1">
                            <a className="text-xl cursor-pointer select-none font-semibold hover:text-blue-600" href={item.html_url} target="_blank" rel='noreferrer'>{item.full_name}</a>
                            <p className="text-sm text-gray-500 my-2 font-sans">{item.description}</p>
                            <div className="text-gray-600 flex flex-row gap-3 text-xs cursor-default flex-wrap mt-4">
                                {
                                    item.language && (
                                        <div className="cursor-default">
                                            <i className="fa-solid fa-circle mr-1" style={Object.keys(colors).includes(item.language) ? { color: colors[item.language].color } : {}}></i>
                                            {item.language}
                                        </div>
                                    )
                                }
                                <div className="">
                                    <i className="fa-regular fa-star mr-1"></i>
                                    {item.stargazers_count.toLocaleString()}
                                </div>
                                <div className="">
                                    <i className="fa-solid fa-code-fork mr-1"></i>
                                    {item.forks.toLocaleString()}
                                </div>
                                <div className="">
                                    <i className="fa-regular fa-circle-dot mr-1"></i>
                                    {item.open_issues.toLocaleString()}
                                </div>
                                {
                                    item.license && (
                                        <div className="">
                                            <i className="fa-solid fa-scale-balanced mr-1"></i>
                                            {item.license.spdx_id}
                                        </div>
                                    )
                                }
                            </div>
                            {
                                item.topics.length > 0 && <div className="border-t my-4"></div>
                            }
                            <div className="text-gray-600 flex flex-row gap-2 text-xs cursor-default flex-wrap">
                                {
                                    item.topics.map(topic => (
                                        <a key={topic} href={`https://github.com/topics/${topic}`} className="github-repo-topic" target="_blank" rel='noreferrer'>
                                            {topic}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )))
            }
        </InfiniteScroll>
    )
}