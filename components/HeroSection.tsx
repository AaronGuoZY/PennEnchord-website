"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const compute = () => {
    const ph = imgRef.current?.offsetHeight ?? 0;
    const th = textRef.current?.offsetHeight ?? 0;
    const scrollRoom = window.innerHeight * 0.8;

    // The text naturally scrolls UP by `scrollRoom` pixels as progress goes 0→1.
    // We want the text bottom (minus bottom padding 64px) to land at photo center (ph/2).
    // text bottom natural position at progress=1: ph - scrollRoom + th
    // target: ph/2
    // extra translateY needed: ph/2 - (ph - scrollRoom + th) + 64
    //                        = scrollRoom - ph/2 - th + 64
    const target = scrollRoom - ph / 2 - th + 64;
    setTranslateY(target);
  };

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const scrollY = window.scrollY;
      const wrapperTop = wrapperRef.current.offsetTop;
      const scrollRoom = window.innerHeight * 0.8;
      const p = Math.max(0, Math.min(1, (scrollY - wrapperTop) / scrollRoom));
      setProgress(p);
      compute();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-black text-white">
      {/* Sticky photo + overlay */}
      <div className="sticky top-0">
        <img
          ref={imgRef}
          src="/media/home/current-group-photo/DSC02890.JPG"
          alt="PennEnchord group photo"
          className="w-full block"
          onLoad={compute}
        />
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: progress * 0.55 }}
        />
      </div>

      {/* Text rises from below the photo to photo center as user scrolls */}
      <div
        ref={textRef}
        className="relative z-10 py-16 px-4 text-center"
        style={{
          transform: `translateY(${progress * translateY}px)`,
          willChange: "transform",
        }}
      >
        <h1 className="text-8xl font-bold tracking-tight mb-6">PennEnchord</h1>
        <p className="text-3xl text-gray-400 max-w-3xl mx-auto mb-12">
          An a cappella group at the University of Pennsylvania, founded in 2013.
          We sing in Chinese and English across genres — and we love what we do.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="/tickets"
            className="bg-white text-gray-900 font-semibold px-10 py-5 text-xl rounded-lg hover:bg-gray-200 transition-colors"
          >
            Get Tickets
          </Link>
          <Link
            href="/concerts"
            className="border border-gray-600 text-gray-300 font-semibold px-10 py-5 text-xl rounded-lg hover:border-white hover:text-white transition-colors"
          >
            Past Concerts
          </Link>
        </div>
      </div>

      {/* Scroll space */}
      <div className="h-[80vh]" />
    </div>
  );
}
