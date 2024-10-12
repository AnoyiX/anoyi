import { useMemo } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { BareFetcher } from "swr/_internal"
import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from "swr/infinite"

export default function useSWRInfiniteScroll<Data = any, Error = any>(
    getKey: SWRInfiniteKeyLoader, 
    fetcher: BareFetcher<Data> | null, 
    config: SWRInfiniteConfiguration<Data, Error, BareFetcher<Data>> | undefined,
    checkHasNextPage: (data: Data[]) => boolean
) {
    const { data = [], isLoading, error, size, setSize } = useSWRInfinite<Data>(getKey, fetcher, config)
    const hasNextPage = useMemo(() => !isLoading && checkHasNextPage(data), [data, isLoading])
    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: () => setSize(size + 1),
        disabled: !!error,
    })

    return {
        data,
        showLoading: isLoading || hasNextPage,
        error,
        sentryRef
    }
}