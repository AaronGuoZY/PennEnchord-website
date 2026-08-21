"use client";

import { useEffect, useState } from "react";

type BookletViewerProps = {
  bookletUrl: string;
};

export default function BookletViewer({ bookletUrl }: BookletViewerProps) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isiOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isiOSDevice);
  }, []);

  if (isIOS) {
    return (
      <div className="w-full rounded-lg border border-gray-800 bg-gray-900/40 p-6">
        <p className="text-gray-300 mb-4">
          Open the concert booklet in Safari's PDF viewer for smooth scrolling.
        </p>
        <a
          href={bookletUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Open Concert Booklet
        </a>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ height: "80vh" }}
    >
      <iframe
        src={bookletUrl}
        title="Concert Booklet"
        className="w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
