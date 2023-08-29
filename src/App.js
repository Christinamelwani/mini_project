import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <nav className="flex justify-between">
          <ul className="flex gap-5 p-4">
            <li>Sports</li>
            <li>Music</li>
            <li>Shows</li>
            <li>Cities</li>
          </ul>
          <ul className="flex gap-5 p-4">
            <li>USD</li>
            <li>Sell</li>
            <li>Support</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>
      <section className="flex w-full justify-center">
        <div className="items-center flex-col flex gap-5 mt-10">
          <h1 className="text-5xl">Let there be live</h1>
          <h2 className="text-3xl">Your next best night ever is waiting</h2>
          <h2 className="text-3xl">And we have the tickets</h2>

          <div className="flex rounded border-2 p-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            What do you want to see live?
          </div>
        </div>
      </section>
      <section className="flex flex-col p-20 gap-5">
        <h2>Browse Events</h2>
        <h2 className="text-3xl text-bold">Menteng Atas, ID</h2>
        <div className="flex gap-5">
          <button className="rounded-full border-2 px-2 py-1">
            Change location
          </button>
          <button className="rounded-full border-2 px-2 py-1">
            Filter by date
          </button>
        </div>
      </section>
      <hr></hr>
      <section className="flex flex-col p-20 gap-5">
        <h2 className="text-xl text-bold">Categories</h2>
        <div className="grid grid-cols-4 gap-10">
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Concerts</div>
        </div>
      </section>
      <section className="flex flex-col p-20 gap-5">
        <h2 className="text-xl text-bold">Popular Events</h2>
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Concerts</div>
        </div>
      </section>
    </div>
  );
}

export default App;
