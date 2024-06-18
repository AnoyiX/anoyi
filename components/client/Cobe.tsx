'use client'

import createGlobe from "cobe"
import { useEffect, useRef } from "react"

type CobeProps = {
    className?: string
}

export function Cobe({ className }: CobeProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        let phi = 0
        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600,
            height: 600,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // longitude latitude
                { location: [121.47, 31.23], size: 0.05 }
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi
                phi += 0.008
            }
        })

        return () => {
            globe.destroy()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={className}
        />
    )
}