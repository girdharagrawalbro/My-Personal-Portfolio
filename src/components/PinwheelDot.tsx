"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function PinwheelDot({ size = 24 }: { size?: number }) {
    const groupRef = useRef<SVGGElement>(null);

    // useEffect(() => {
    //     gsap.to(svgRef.current, {
    //         rotation: 360,
    //         duration: 3,
    //         ease: "none",
    //         repeat: -1,
    //         transformOrigin: "50% 50%",
    //     });
    // }, []);

    useEffect(() => {
        gsap.to(groupRef.current, {
            rotation: 720,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
            transformOrigin: "54px 54px",
        });
    }, []);


    return (
        <svg
            width={size} height={size}
            viewBox="0 0 100 100"
            style={{ display: "inline-block", overflow: "visible" }}
        >
            <defs>
                {/* Ambient glow */}
                <radialGradient id="pdGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pd1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <linearGradient id="pd2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E879F9" />
                    <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="pd3" x1="1" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
                <linearGradient id="pd4" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Soft glow behind */}
            <circle cx="54" cy="54" r="60" fill="url(#pdGlow)" />

            {/* Petals */}
            <g ref={groupRef}>
                <path opacity="0.85" d="M54,54 Q50,0 0,0 Q0,50 50,50Z" fill="url(#pd1)" />
                <path opacity="0.85" d="M54,54 Q100,50 100,0 Q50,0 50,50Z" fill="url(#pd2)" />
                <path opacity="0.85" d="M54,54 Q50,100 100,100 Q100,50 50,50Z" fill="url(#pd3)" />
                <path opacity="0.85" d="M54,54 Q0,50 0,100 Q50,100 50,50Z" fill="url(#pd4)" />
                {/* Center highlight */}
                <circle cx="54" cy="54" r="15" fill="white" opacity="1" />
            </g>
        </svg>
    );
}