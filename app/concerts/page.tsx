import Link from "next/link";
import { concerts } from "@/data/concerts";

export default function ConcertsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2 text-white">Past Concerts</h1>
      <p className="text-gray-500 mb-10">Every semester, a new show.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.map((concert) => (
          <Link
            key={concert.slug}
            href={`/concerts/${concert.slug}`}
            className="group border border-gray-800 rounded-xl overflow-hidden bg-gray-900 hover:border-gray-600 transition-colors"
          >
            <div className="bg-gray-800 h-48 flex items-center justify-center text-gray-600 text-sm">
              {concert.coverImage ? (
                <img
                  src={concert.coverImage}
                  alt={concert.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                "No photo yet"
              )}
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{concert.semester}</p>
              <h2 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors">{concert.name}</h2>
              {concert.date && <p className="text-sm text-gray-500 mt-1">{concert.date}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
