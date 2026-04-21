export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} PennEnchord. All rights reserved.</p>
        <div className="flex gap-5">
          <a
            href="https://www.youtube.com/@PennEnchord"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://www.instagram.com/pennenchord"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:pennenchord@gmail.com"
            className="hover:text-gray-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
