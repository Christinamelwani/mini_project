export default function Filters() {
  return (
    <section className="p-4 md:p-20 gap-5">
      <h2>Browse Events</h2>
      <h2 className="text-3xl font-bold">Menteng Atas, ID</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <button className="rounded-full border-2 px-2 py-1 mb-2 md:mb-0">
          Change location
        </button>
        <button className="rounded-full border-2 px-2 py-1">
          Filter by date
        </button>
      </div>
    </section>
  );
}
