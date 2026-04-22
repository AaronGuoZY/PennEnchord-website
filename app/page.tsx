import Link from "next/link";
import { concerts } from "@/data/concerts";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const upcoming = concerts[0];

  return (
    <div>
      <HeroSection />

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
          宾大安可阿卡贝拉清唱团（EnChord A Cappella at Penn）成立于 2013 年，由来自宾大多个学院和年级的大陆留学生共同创立。
          <br />
          我们热爱音乐，无论是古典、流行还是 Rap，并用纯人声的方式演绎多元风格的中英文歌曲。
          <br />
          十年间，安可编曲团队改编与创作 180 余首作品，其中原创编曲近 100 首，包括《冰雪奇缘组曲》、《红玫瑰》、《周杰伦串烧》、《童年回忆杀》等经典曲目。
          <br />
          历年来演唱会售票累计 4500 张，观众遍及校园内外。
          <br />
          安可大家庭已有 100 余位成员，他们在世界各地继续传递属于 EnChord 的音乐与友情。
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
