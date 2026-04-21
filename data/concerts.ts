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
    slug: "spring-2024-starry-night",
    name: "Starry Night",
    semester: "Spring 2024",
    date: "April 20, 2024",
    description: "Our 10th Anniversary Concert.",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "fall-2023-by-the-fireplace",
    name: "By the Fireplace",
    semester: "Fall 2023",
    date: "December 1–2, 2023",
    description: "",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "spring-2023-wild-bloom",
    name: "Wild Bloom",
    semester: "Spring 2023",
    date: "April 16, 2023",
    description: "",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "fall-2022-seize-the-ephemerality",
    name: "Seize the Ephemerality",
    semester: "Fall 2022",
    date: "",
    description: "",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "spring-2022-light-the-night",
    name: "Light the Night · 华灯初上",
    semester: "Spring 2022",
    date: "",
    description: "",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
  {
    slug: "fall-2021-dreamwaking",
    name: "Dreamwaking · 拂晓之时",
    semester: "Fall 2021",
    date: "",
    description: "",
    coverImage: "",
    youtubeVideos: [],
    photos: [],
  },
];
