export default function AuditionPage() {
  return (
    <div className="flex flex-col items-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-3 text-white">Join PennEnchord</h1>
      <p className="text-gray-400 max-w-xl mb-8 text-2xl leading-relaxed">
        🎶 Penn Enchord is holding Fall 2026 auditions — and we&apos;re looking for more than just singers.
        Whether you beatbox 🥁, compose 🎼, direct, shoot video 📸, or handle stage tech 🎛️, there&apos;s a spot for you.
        No experience required — just a love for music and a willingness to make something great together. 🙌
      </p>
      <a
        href="https://pennenchord.com/audition/apply"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors text-lg mb-8"
      >
        Apply Now →
      </a>
      <img
        src="/media/audition/audition-poster/26-fall-audition.jpg"
        alt="PennEnchord Fall 2026 Auditions poster"
        className="w-4/5 rounded-xl shadow-lg"
      />
    </div>
  );
}
