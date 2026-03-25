"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Test() {
    const boxRef = useRef(null);

    const animateBox = () => {
        gsap.to(boxRef.current, {
            x: 200,
            backgroundColor: "red",
            duration: 1,
            ease: "power2.inOut",
            repeat: 2,
            yoyo: true,
            onComplete: () => {
                console.log("Animation finished");
            },
        });
    };

    return (
        <div style={{ padding: "50px" }}>
            <div
                ref={boxRef}
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "blue",
                }}
            ></div>

            <button
                onClick={animateBox}
                style={{ marginTop: "20px", padding: "10px 20px" }}
            >
                Start Animation
            </button>
        </div>
    );
}