export default function TicketsPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Get Tickets</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Tickets for our upcoming concert are now available. Grab yours before they sell out!
      </p>
      <a
        href="#"
        className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors text-lg"
      >
        Buy Tickets →
      </a>
      <p className="text-xs text-gray-600 mt-4">You will be redirected to our ticketing platform.</p>
    </div>
  );
}
