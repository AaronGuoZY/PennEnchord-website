import Link from "next/link";
import { concerts } from "@/data/concerts";

export default function Home() {
  const upcoming = concerts[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">PennEnchord</h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
          An a cappella group at the University of Pennsylvania, founded in 2013.
          We sing in Chinese and English across genres — and we love what we do.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/tickets"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Get Tickets
          </Link>
          <Link
            href="/concerts"
            className="border border-gray-600 text-gray-300 font-semibold px-6 py-3 rounded-lg hover:border-white hover:text-white transition-colors"
          >
            Past Concerts
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "2013", label: "Founded" },
            { value: "180+", label: "Arrangements" },
            { value: "4,500+", label: "Tickets Sold" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-white">{s.value}</p>
              <p className="text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-14 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
          <p className="text-gray-400 leading-relaxed">
            PennEnchord was founded in 2013 by mainland Chinese international students from various
            schools at Penn. We perform original arrangements and compositions across multiple genres
            and languages, hosting two concerts each semester. Beyond performing, we participate in
            charity events, senior center visits, and cultural celebrations across Philadelphia.
          </p>
        </div>
      </section>

      {/* Most Recent Concert */}
      <section className="py-14 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Most Recent Concert</h2>
          <div className="border border-gray-800 rounded-xl p-8 text-center bg-gray-900">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{upcoming.semester}</p>
            <h3 className="text-2xl font-bold mb-2 text-white">{upcoming.name}</h3>
            {upcoming.date && <p className="text-gray-400 mb-4">{upcoming.date}</p>}
            {upcoming.description && <p className="text-gray-400 mb-6">{upcoming.description}</p>}
            <Link
              href={`/concerts/${upcoming.slug}`}
              className="inline-block border border-gray-600 text-gray-300 font-medium px-5 py-2 rounded-lg hover:border-white hover:text-white transition-colors"
            >
              View Concert
            </Link>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-14 px-4 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Follow Us</h2>
        <p className="text-gray-400 mb-6">Stay up to date with our performances and announcements.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://www.youtube.com/@PennEnchord"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://www.instagram.com/pennenchord"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
