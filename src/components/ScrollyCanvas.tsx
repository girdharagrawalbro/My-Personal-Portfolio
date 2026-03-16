"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

const getFramePath = (index: number) => {
  const numStr = String(index).padStart(3, "0");
  return `/sequence/frame_${numStr}_delay-0.066s.png`;
};

export default function ScrollyCanvas({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const loadImage = (index: number) => {
      const img = new Image();
      img.src = getFramePath(index);
      img.onload = () => {
        loadedImages[index] = img;
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      // fallback in case of load error to not block forever
      img.onerror = () => {
        loadedImages[index] = img;
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      loadImage(i);
    }
  }, []);

  const renderFrame = (index: number) => {
    if (
      !contextRef.current ||
      !canvasRef.current ||
      !images[index] ||
      !images[index].width
    )
      return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw with smooth image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (loaded && canvasRef.current && images.length > 0) {
      if (!contextRef.current) {
        contextRef.current = canvasRef.current.getContext("2d");
      }
      renderFrame(0);
    }
  }, [loaded, images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT)),
    );
    // Use requestAnimationFrame for smooth drawing
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        if (loaded) {
          const currentFrame = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.floor(scrollYProgress.get() * FRAME_COUNT)),
          );
          requestAnimationFrame(() => renderFrame(currentFrame));
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, scrollYProgress]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
      {/* Gradient fade to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Loading state indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black text-white">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4" />
          <p className="text-sm font-mono tracking-widest opacity-60 uppercase">
            Loading Experience
          </p>
        </div>
      )}
    </>
  );
}
