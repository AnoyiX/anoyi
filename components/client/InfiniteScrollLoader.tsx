'use client'

import { cn } from "@/lib/utils";
import { Loading } from "../Icons";
import { IntersectionObserverHookRefCallback } from 'react-intersection-observer-hook';

export interface InfiniteScrollLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    sentryRef: IntersectionObserverHookRefCallback,
    showLoading: boolean
}

export default function InfiniteScrollLoader({ showLoading, className, sentryRef, ...props }: InfiniteScrollLoaderProps) {

    if (!showLoading) return <></>

    return (
        <div ref={sentryRef} className={cn("my-8 mx-auto col-span-full", className)} {...props}>
            <Loading className='h-20 w-20' />
        </div>
    )
}