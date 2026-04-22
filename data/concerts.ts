export type Concert = {
  slug: string;
  name: string;
  semester: string;
  date: string;
  description: string;
  coverImage: string;
  youtubeVideos: { title: string; url: string }[];
  photos: string[];
};

export const concerts: Concert[] = [
  {
    slug: "2026-spring-the-time-capsule-letters",
    name: "时光信笺 | The Time Capsule Letters",
    semester: "2026 Spring",
    date: "April 26, 2026",
    description: "A collection of letters from the past, present, and future.",
    coverImage: "/media/concerts/2026-spring/poster/pennenchord_26spring_poster.jpg",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "2025-fall-kaleidoscope",
    name: "繁花 | Kaleidoscope",
    semester: "2025 Fall",
    date: "November 23, 2025",
    description: "A collection of letters from the past, present, and future.",
    coverImage: "/media/concerts/2025-fall/poster/PennEnchord_2025_Fall_Poster.jpg",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "2025-spring-floating-lives",
    name: "浮生 | Floating Live",
    semester: "2025 Spring",
    date: "April 18-19th, 2025",
    description: "A collection of letters from the past, present, and future.",
    coverImage: "/media/concerts/2025-spring/poster/pennenchord_25spring_poster.jpg",
    youtubeVideos: [],
    photos: [],
  },
];
