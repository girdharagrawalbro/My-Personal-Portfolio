"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PinwheelDot from "@/components/PinwheelDot";

gsap.registerPlugin(ScrollTrigger);

export default function Overlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!containerRef?.current || !rootRef.current) return;

    const scroller = containerRef.current;

    const ctx = gsap.context(() => {
      // Timeline scrubbed across entire scroll container.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scroller,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      // 0% -> 20%: center heading visible then fades
      tl.fromTo(
        centerRef.current,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -50, ease: "power1.out" }, 
        0 // timeline absolute position
      );

      // 30% -> 50%: left block
      tl.fromTo(
        leftRef.current,
        { autoAlpha: 0, x: -80 },
        { autoAlpha: 1, x: 0, ease: "power3.out" },
        0.3 // relative position in the scrubbed timeline
      );

      // 60% -> 80%: right block
      tl.fromTo(
        rightRef.current,
        { autoAlpha: 0, x: 80 },
        { autoAlpha: 1, x: 0, ease: "power3.out" },
        0.6
      );

      // Pinwheel: micro-rotation & bounce linked to timeline progress
      tl.to(
        pinRef.current,
        {
          rotation: 360,
          scale: 1.02,
          transformOrigin: "50% 50%",
          ease: "none",
        },
        0 // rotate over entire timeline so it feels tied to scrubbing
      );

      // Optional: subtle parallax text letters (if you wrap letters)
      // e.g., gsap.fromTo(".heading .char", {y:20, autoAlpha:0}, {y:0, autoAlpha:1, stagger:0.02}, 0)

    }, rootRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div ref={rootRef} className="absolute inset-0 z-10 pointer-events-none text-white overflow-hidden">
      {/* Center */}
      <div ref={centerRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-widest mb-4 text-white drop-shadow-2xl flex items-center justify-center flex-wrap">
          <span>G</span>
          <span className="relative inline-flex justify-center items-center">
            <span style={{ color: "transparent" }}>i</span>
            <span ref={pinRef} className="absolute left-1/2" style={{ top: "-0.7em", left: "50%", transform: "translateX(-60%) scale(0.95)" }}>
              <PinwheelDot size={64} />
            </span>
            <span className="absolute inset-0 flex items-center justify-center">ı</span>
          </span>
          <span>rdhar Agrawal</span>
        </h1>
        <p className="text-xl md:text-3xl font-light tracking-wide text-zinc-300">Creative Developer.</p>
      </div>

      {/* Left */}
      <div ref={leftRef} className="absolute inset-0 flex flex-col items-start justify-center p-12 md:p-32">
        <h2 className="text-4xl md:text-7xl font-bold max-w-2xl leading-tight text-white drop-shadow-lg">I build digital experiences.</h2>
      </div>

      {/* Right */}
      <div ref={rightRef} className="absolute inset-0 flex flex-col items-end justify-center text-right p-12 md:p-32">
        <h2 className="text-4xl md:text-7xl font-bold max-w-2xl leading-tight text-white drop-shadow-lg">Bridging design and engineering.</h2>
      </div>
    </div>
  );
}