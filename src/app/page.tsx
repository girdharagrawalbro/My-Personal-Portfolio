"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import NanoBanana from "@/components/NanoBanana";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-white/30 font-sans relative antialiased">
      <div
        ref={scrollContainerRef}
        className="relative h-[500vh] w-full bg-black"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollRef={scrollContainerRef} />
          <Overlay containerRef={scrollContainerRef} />
        </div>
      </div>

      <Projects />

      {/* "Use nano banana for extra UI components." */}
      <div className="fixed bottom-6 right-6 z-50">
        <NanoBanana />
      </div>
    </main>
  );
}
