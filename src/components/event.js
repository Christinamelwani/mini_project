export default function Event({ onOpenRegister }) {
  return (
    <div className="bg-black text-white rounded p-4">
      <img
        src="https://blog.hubspot.com/hs-fs/hubfs/about-us-page_20.webp?width=595&height=400&name=about-us-page_20.webp"
        className="mb-4 w-full"
      />
      <div className="flex flex-col items-center md:flex-row md:items-center justify-between">
        <h3 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4 text-center md:text-left">
          Example Event
        </h3>
        <button
          onClick={() => onOpenRegister()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
