# PennEnchord Website Editing Guide

This guide covers how to update content, add media, and embed posts from YouTube, Instagram, Xiaohongshu, and WeChat Official Account.

---

## Table of Contents

1. [How the Site Is Organized](#1-how-the-site-is-organized)
2. [Adding a New Concert](#2-adding-a-new-concert)
3. [Adding Images](#3-adding-images)
4. [Embedding YouTube Videos](#4-embedding-youtube-videos)
5. [Embedding Instagram Posts](#5-embedding-instagram-posts)
6. [Embedding Xiaohongshu (小红书) Posts](#6-embedding-xiaohongshu-小红书-posts)
7. [Embedding WeChat Official Account Articles](#7-embedding-wechat-official-account-articles)
8. [Updating Member Rosters](#8-updating-member-rosters)
9. [Configuring the Live Stream Page](#9-configuring-the-live-stream-page)
10. [Updating Social Links and Footer](#10-updating-social-links-and-footer)

---

## 1. How the Site Is Organized

All **content you need to edit** lives in two places:

| What | Where |
|------|--------|
| Concert data (names, videos, photos) | `data/concerts.ts` |
| Member rosters | `data/members/fall-YYYY.ts` / `data/members/spring-YYYY.ts` |
| Live stream config | `data/live.ts` |
| Static images and media files | `public/media/` |

You almost never need to touch the files in `app/` unless you are adding a brand-new type of embed (see sections 5–7 below).

---

## 2. Adding a New Concert

Open `data/concerts.ts` and add a new entry to the `concerts` array at the **top** of the array (so it appears first on the site):

```ts
{
  slug: "spring-2025-your-concert-name",   // URL-safe, kebab-case, unique
  name: "Your Concert Name",
  semester: "Spring 2025",
  date: "April 19, 2025",
  description: "A short description shown on the concert detail page.",
  coverImage: "/media/concerts/spring-2025-your-concert-name/cover.jpg",
  youtubeVideos: [],   // fill in later — see Section 4
  photos: [],          // fill in later — see Section 3
},
```

Create a matching folder for the concert's media:

```
public/media/concerts/spring-2025-your-concert-name/
public/media/concerts/spring-2025-your-concert-name/photos/
```

The slug you choose becomes the URL: `/concerts/spring-2025-your-concert-name/`.

---

## 3. Adding Images

### Concert cover image

1. Place the image at `public/media/concerts/<slug>/cover.jpg` (JPG or PNG, recommended 1280×720 or wider).
2. In `data/concerts.ts`, set `coverImage: "/media/concerts/<slug>/cover.jpg"`.

### Concert photo gallery

1. Place photos in `public/media/concerts/<slug>/photos/` — name them `01.jpg`, `02.jpg`, etc.
2. In `data/concerts.ts`, add each path to the `photos` array:

```ts
photos: [
  "/media/concerts/spring-2025-your-concert-name/photos/01.jpg",
  "/media/concerts/spring-2025-your-concert-name/photos/02.jpg",
  "/media/concerts/spring-2025-your-concert-name/photos/03.jpg",
],
```

### Member profile photos

1. Place each member's photo in `public/media/members/<semester>/` — e.g., `jane-doe.jpg`.
2. In the member's entry in `data/members/<semester>.ts`, set `photo: "/media/members/<semester>/jane-doe.jpg"`.

> **Tip:** Keep images under 500 KB each. Use JPEG for photos, PNG only when transparency is needed.

---

## 4. Embedding YouTube Videos

### Get the embed URL

From any YouTube video URL such as:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```
Change it to the embed form:
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

### Add it to a concert

In `data/concerts.ts`, fill in `youtubeVideos` for the concert:

```ts
youtubeVideos: [
  {
    title: "Full Concert Recording",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Behind the Scenes",
    url: "https://www.youtube.com/embed/ANOTHER_VIDEO_ID",
  },
],
```

The concert detail page (`app/concerts/[slug]/page.tsx`) already renders these as full-width responsive iframes — no code changes needed.

### Optional parameters

Append query parameters to the embed URL to control playback behavior:

| Parameter | Effect |
|-----------|--------|
| `?start=90` | Start at 1:30 |
| `?rel=0` | Don't show related videos at the end |
| `?cc_load_policy=1` | Show captions by default |

Example: `https://www.youtube.com/embed/dQw4w9WgXcQ?start=90&rel=0`

---

## 5. Embedding Instagram Posts

Instagram does not allow simple `<iframe>` embeds. Their official method uses a `<blockquote>` tag plus a loader script. Because this requires inserting raw HTML into a React page, you need to edit the page file directly.

### Step 1 — Get the embed code

1. Go to the Instagram post in a browser.
2. Click the **three-dot menu (…)** → **Embed**.
3. Copy the code. It looks like:

```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/" ...>
  ...
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

### Step 2 — Add it to a concert page

Open `app/concerts/[slug]/page.tsx`. Find the section where photos and videos are rendered and add a new block for social embeds. Here is an example of where to insert it (after the YouTube videos block):

```tsx
{/* Instagram embeds */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Instagram</h2>
  <div className="flex flex-wrap gap-4 justify-center">
    <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/p/POST_ID/"
      data-instgrm-version="14"
      style={{ maxWidth: 540, width: "100%" }}
    />
  </div>
  <script async src="https://www.instagram.com/embed.js" />
</div>
```

Replace `POST_ID` with the ID from the URL of the specific post (the part after `/p/`).

### Step 3 — Allow the Instagram domain in Next.js

Because the site uses `output: "export"` (fully static), no server-side changes are required. However, if you add a Content Security Policy header later, you will need to allow `instagram.com`.

> **Note:** Instagram embeds require JavaScript and a live internet connection to render. They will not display in a plain HTML file opened locally.

---

## 6. Embedding Xiaohongshu (小红书) Posts

Xiaohongshu does not provide an official embed API for external websites. The recommended approaches are:

### Option A — Screenshot (simplest, most reliable)

1. Take a screenshot of the post on your phone or desktop.
2. Save it as a JPG in `public/media/concerts/<slug>/photos/` or a dedicated `public/media/social/` folder.
3. Reference it in the `photos` array (see [Section 3](#3-adding-images)) or add it inline in the page as a plain `<img>` tag.

This guarantees the content always displays correctly regardless of platform changes.

### Option B — Link card with preview image

Add a clickable image that links to the post:

```tsx
{/* Xiaohongshu post link */}
<a
  href="https://www.xiaohongshu.com/explore/POST_ID"
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>
  <img
    src="/media/social/xhs-preview.jpg"
    alt="View on Xiaohongshu"
    className="rounded-lg w-full max-w-sm mx-auto"
  />
  <p className="text-center text-sm text-gray-400 mt-1">View on 小红书 ↗</p>
</a>
```

Place this block inside the relevant concert page section in `app/concerts/[slug]/page.tsx`.

### Option C — Iframe (works for some posts, not guaranteed)

Some Xiaohongshu post URLs can be loaded in an iframe, but this depends on the post's privacy settings and may break without warning:

```tsx
<div className="aspect-[9/16] w-full max-w-sm mx-auto">
  <iframe
    src="https://www.xiaohongshu.com/explore/POST_ID"
    className="w-full h-full rounded-lg border-0"
    title="Xiaohongshu post"
    sandbox="allow-scripts allow-same-origin"
  />
</div>
```

**Option A (screenshot) is strongly recommended** for reliability.

---

## 7. Embedding WeChat Official Account Articles

WeChat MP articles (`mp.weixin.qq.com`) can be embedded via iframe. The article must be **publicly accessible** (not members-only or behind a login).

### Step 1 — Get the article URL

Share the article and copy its link. It will look like:
```
https://mp.weixin.qq.com/s/ARTICLE_ID_HERE
```

### Step 2 — Add the embed to a concert page

Open `app/concerts/[slug]/page.tsx` and add the following block in the appropriate section:

```tsx
{/* WeChat article embed */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">WeChat Article</h2>
  <div className="w-full rounded-lg overflow-hidden border border-gray-700"
       style={{ height: 600 }}>
    <iframe
      src="https://mp.weixin.qq.com/s/ARTICLE_ID_HERE"
      className="w-full h-full border-0"
      title="WeChat Official Account article"
      sandbox="allow-scripts allow-same-origin allow-popups"
    />
  </div>
  <p className="text-sm text-gray-500 mt-1 text-right">
    <a
      href="https://mp.weixin.qq.com/s/ARTICLE_ID_HERE"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-300"
    >
      Open in WeChat ↗
    </a>
  </p>
</div>
```

Replace `ARTICLE_ID_HERE` with the actual ID from the article URL.

### Important limitations

- WeChat may block iframe embedding for some articles (shows a blank page or a login prompt). If that happens, fall back to a screenshot (same as Xiaohongshu Option A) with a link.
- The article must remain public. If it is deleted or restricted on WeChat, the embed will break.
- Users in some regions may need a VPN to load WeChat content.

---

## 8. Updating Member Rosters

### Edit an existing semester

Open the relevant file, e.g., `data/members/fall-2023.ts`, and add or modify entries in the `semesterMembers` array:

```ts
{
  name: "Jane Doe",
  part: "Soprano",           // Soprano | Alto | Tenor | Bass | Beatbox | Marketing
  school: "College of Arts & Sciences",
  major: "Computer Science",
  current: true,             // true = Current Member, false/omitted = Alumni
  funFact: "Can solve a Rubik's cube in under a minute.",
  photo: "/media/members/fall-2023/jane-doe.jpg",   // optional
},
```

The `current` field controls which section the member appears under on the page. Members with `current: true` are shown under **Current Members**; everyone else appears under **Alumni**. If you omit `current`, the member defaults to Alumni.

### Add a new semester

1. Create `data/members/spring-2025.ts` modeled after an existing semester file. Export `semesterMembers` as the array name.
2. Register it in `app/members/[semester]/page.tsx` by adding to the `semesterData` object:

```ts
const semesterData: Record<string, Member[]> = {
  "fall-2023": fall2023Members,
  "spring-2023": spring2023Members,
  "spring-2025": spring2025Members,   // add this line
};
```

3. Add the import at the top of the same file:

```ts
import spring2025Members from "@/data/members/spring-2025";
```

4. Add the new semester to the `semesters` array in the same file so it appears in the semester selector:

```ts
const semesters = ["spring-2025", "fall-2023", "spring-2023"];
```

---

## 9. Configuring the Live Stream Page

Edit `data/live.ts`:

```ts
export const liveStream = {
  active: true,                        // set to false when not live
  concertName: "Spring 2025 Concert",
  youtube: "https://www.youtube.com/watch?v=LIVE_STREAM_ID",
  bilibili: "https://live.bilibili.com/ROOM_ID",
};
```

When `active` is `false`, the page shows that there is no live stream. When `active` is `true`, a "LIVE NOW" badge appears and the links become active.

---

## 10. Updating Social Links and Footer

| What to update | File | What to change |
|----------------|------|----------------|
| Footer YouTube link | `components/Footer.tsx` | The `href` in the YouTube `<a>` tag |
| Footer Instagram link | `components/Footer.tsx` | The `href` in the Instagram `<a>` tag |
| Footer contact email | `components/Footer.tsx` | The `href="mailto:..."` value |
| Home page hero YouTube button | `app/page.tsx` | The `href` on the "Watch on YouTube" link |
| Home page hero Instagram button | `app/page.tsx` | The `href` on the "Follow on Instagram" link |
| Page title & SEO description | `app/layout.tsx` | The `metadata` export object |
| Navigation links | `components/Navbar.tsx` | The `links` array |
