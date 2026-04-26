"use client";

import { useEffect, useState } from "react";
import { liveStream } from "@/data/live";

const scheduleStart = new Date(liveStream.schedule.start);
const scheduleEnd = new Date(liveStream.schedule.end);

function isLiveNow() {
  const now = new Date();
  return now >= scheduleStart && now <= scheduleEnd;
}

type PlatformCardProps = {
  name: string;
  href: string | undefined;
  active: boolean;
  logo: React.ReactNode;
  logoLabel: React.ReactNode;
  accentClass: string;
};

function PlatformCard({ name, href, active, logo, logoLabel, accentClass }: PlatformCardProps) {
  const hasLink = !!href;

  const content = (
    <div
      className={`flex flex-col items-center gap-6 w-56 py-10 px-6 rounded-2xl border-2 transition-all
        ${hasLink
          ? `${accentClass} cursor-pointer`
          : "border-gray-800 bg-gray-900 opacity-40 cursor-not-allowed"
        }`}
    >
      <div className="flex items-center justify-center">{logo}</div>
      <div className="flex flex-col items-center gap-1">
        {logoLabel}
        {hasLink && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${
            active
              ? "bg-red-500/20 text-red-400"
              : "bg-gray-700/50 text-gray-400"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-red-400 animate-pulse" : "bg-gray-500"}`} />
            {active ? "Live now" : "Not live"}
          </span>
        )}
        {!hasLink && (
          <span className="text-xs text-gray-500 mt-1">Not available</span>
        )}
      </div>
    </div>
  );

  if (hasLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default function LivePage() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isLiveNow());
    const interval = setInterval(() => setActive(isLiveNow()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {active ? (
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE NOW
        </div>
      ) : null}

      <h1 className="text-4xl font-bold mb-2">
        {active ? liveStream.concertName : "Live Stream"}
      </h1>
      <p className="text-gray-500 mb-10 max-w-md">
        {active
          ? "Choose your platform to watch the live stream."
          : "No live stream is currently active. Check back during our next concert!"}
      </p>

      <div className="flex gap-6 flex-wrap justify-center">
        {/* YouTube */}
        <PlatformCard
          name="YouTube"
          href={liveStream.youtube}
          active={active}
          accentClass="border-red-500 bg-red-950 hover:bg-red-900"
          logo={
            <svg viewBox="0 0 102 72" className="w-24 h-auto" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M99.6 11.2A12.8 12.8 0 0 0 90.6 2C82.7 0 51 0 51 0S19.3 0 11.4 2A12.8 12.8 0 0 0 2.4 11.2C0 19.1 0 36 0 36s0 16.9 2.4 24.8A12.8 12.8 0 0 0 11.4 70C19.3 72 51 72 51 72s31.7 0 39.6-2a12.8 12.8 0 0 0 9-9.2C102 52.9 102 36 102 36s0-16.9-2.4-24.8z"
                fill="#FF0000"
              />
              <polygon points="41,52 41,20 67,36" fill="white" />
            </svg>
          }
          logoLabel={
            <span className="font-semibold text-gray-200 text-sm">YouTube</span>
          }
        />

        {/* Bilibili */}
        <PlatformCard
          name="Bilibili"
          href={liveStream.bilibili}
          active={active}
          accentClass="border-blue-400 bg-blue-950 hover:bg-blue-900"
          logo={
            <img src="/logo/Bilibili_2020.svg" alt="Bilibili" className="w-32 h-auto" />
          }
          logoLabel={
            <span className="font-semibold text-gray-200 text-sm">Bilibili</span>
          }
        />
      </div>

      {!active && (
        <p className="text-xs text-gray-400 mt-10">
          Follow us on Instagram{" "}
          <a href="https://www.instagram.com/pennenchord" className="underline hover:text-gray-600">
            @pennenchord
          </a>{" "}
          for announcements.
        </p>
      )}
    </div>
  );
}
