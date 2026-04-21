import { concerts } from "@/data/concerts";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return concerts.map((c) => ({ slug: c.slug }));
}

export default async function ConcertPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = concerts.find((c) => c.slug === slug);
  if (!concert) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link href="/concerts" className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8 inline-block">
        ← Back to Concerts
      </Link>

      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{concert.semester}</p>
      <h1 className="text-4xl font-bold mb-2 text-white">{concert.name}</h1>
      {concert.date && <p className="text-gray-400 mb-4">{concert.date}</p>}
      {concert.description && <p className="text-gray-400 mb-10">{concert.description}</p>}

      {/* YouTube Videos */}
      {concert.youtubeVideos.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Performances</h2>
          <div className="flex flex-col gap-8">
            {concert.youtubeVideos.map((video) => (
              <div key={video.url}>
                <p className="font-medium mb-2 text-gray-300">{video.title}</p>
                <div className="aspect-video w-full">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {concert.photos.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {concert.photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`${concert.name} photo ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>
      )}

      {concert.youtubeVideos.length === 0 && concert.photos.length === 0 && (
        <p className="text-gray-600 italic">Media coming soon.</p>
      )}
    </div>
  );
}
