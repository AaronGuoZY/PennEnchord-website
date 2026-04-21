import { liveStream } from "@/data/live";

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* YouTube wordmark: icon + text */}
      {/* Icon: red rounded rect + white play triangle */}
      <rect x="0" y="0" width="28" height="20" rx="4" fill="#FF0000" />
      <polygon points="11,5 11,15 21,10" fill="white" />
      {/* "YouTube" text */}
      <text x="32" y="15" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="currentColor">
        YouTube
      </text>
    </svg>
  );
}

function BilibiliLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#00A1D6" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  );
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
  const content = (
    <div
      className={`flex flex-col items-center gap-6 w-56 py-10 px-6 rounded-2xl border-2 transition-all
        ${active && href
          ? `${accentClass} cursor-pointer`
          : "border-gray-800 bg-gray-900 opacity-40 cursor-not-allowed"
        }`}
    >
      <div className="flex items-center justify-center">{logo}</div>
      <div className="flex flex-col items-center gap-1">
        {logoLabel}
        <span className="text-xs text-gray-400 mt-1">
          {active && href ? "Watch live →" : "Not streaming"}
        </span>
      </div>
    </div>
  );

  if (active && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default function LivePage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {liveStream.active ? (
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE NOW
        </div>
      ) : null}

      <h1 className="text-4xl font-bold mb-2">
        {liveStream.active ? liveStream.concertName : "Live Stream"}
      </h1>
      <p className="text-gray-500 mb-10 max-w-md">
        {liveStream.active
          ? "Choose your platform to watch the live stream."
          : "No live stream is currently active. Check back during our next concert!"}
      </p>

      <div className="flex gap-6 flex-wrap justify-center">
        {/* YouTube */}
        <PlatformCard
          name="YouTube"
          href={liveStream.youtube}
          active={liveStream.active}
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
          active={liveStream.active}
          accentClass="border-blue-400 bg-blue-950 hover:bg-blue-900"
          logo={
            <svg viewBox="0 0 219 179" className="w-24 h-auto" xmlns="http://www.w3.org/2000/svg" fill="#00A1D6">
              <path d="M168.3 32.1h8.2c14.5.5 26.6 5.6 36.2 15.1 9.6 9.5 14.6 21.6 15 36.1v70.7c-.4 14.5-5.4 26.6-15 36.2-9.6 9.6-21.7 14.6-36.2 15H51.3c-14.5-.3-26.6-5.3-36.2-15C5.5 180.7.5 168.6.1 154.1V83.3c.3-14.5 5.3-26.6 14.9-36.1C24.7 37.7 36.7 32.6 51.3 32.1h7.4L47.5 21.3a11.8 11.8 0 0 1-3.6-8.7A11.8 11.8 0 0 1 47.5 3.8l.3-.3C50.3 1.2 53 0 56 0c3.3 0 6.3 1.2 8.8 3.6l27.4 26.4c.7.6 1.3 1.4 1.8 2h41c.5-.6 1-1.4 1.5-2L164 3.6c2.6-2.4 5.5-3.6 8.9-3.6 3.3 0 6.3 1.4 8.9 3.8 2.6 2.4 3.8 5.3 3.8 8.7 0 3.4-1.2 6.3-3.6 8.7zM51.3 62.5c-7.2.2-13.2 2.7-18.1 7.4-4.9 4.8-7.4 10.9-7.5 18.2v72.3c.2 7.3 2.7 13.4 7.5 18.2 4.9 4.8 10.9 7.3 18.1 7.5h128c7.2-.2 13.2-2.7 18.1-7.5 4.9-4.8 7.4-10.9 7.5-18.2v-72.3c-.2-7.3-2.7-13.4-7.5-18.2-4.9-4.7-10.9-7.2-18.1-7.4zM77 106.5c3.6 0 6.6 1.2 9 3.6 2.4 2.4 3.7 5.5 3.8 9.2v11.3c-.2 3.7-1.4 6.8-3.8 9.2-2.4 2.4-5.4 3.6-9 3.6s-6.6-1.2-9-3.6c-2.4-2.4-3.7-5.5-3.8-9.2v-11.3c0-3.6 1.2-6.6 3.7-9.1 2.5-2.5 5.5-3.7 9.1-3.7zm77 0c3.6 0 6.6 1.2 9 3.6 2.4 2.4 3.7 5.5 3.8 9.2v11.3c-.2 3.7-1.4 6.8-3.8 9.2-2.4 2.4-5.4 3.6-9 3.6s-6.6-1.2-9-3.6c-2.4-2.4-3.7-5.5-3.8-9.2v-11.3c.2-3.7 1.4-6.8 3.8-9.2 2.4-2.4 5.4-3.6 9-3.6z" />
            </svg>
          }
          logoLabel={
            <span className="font-semibold text-gray-200 text-sm">Bilibili</span>
          }
        />
      </div>

      {!liveStream.active && (
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
