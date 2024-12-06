'use client'

import { SVGProps, useMemo } from "react"

const IconSort = (props: SVGProps<SVGSVGElement> & {
    value: number
}) => {

    const { value, ...svgProps } = props

    const upFill = useMemo(() => value > 0 ? 'black' : '#a3a3a3', [value])
    const downFill = useMemo(() => value < 0 ? 'black' : '#a3a3a3', [value])

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
            <path d="M18 9 12 3 6 9H18Z" fill={upFill} />
            <path d="M18 15 12 21 6 15H18Z" fill={downFill} />
        </svg>
    )
}

export default IconSort
