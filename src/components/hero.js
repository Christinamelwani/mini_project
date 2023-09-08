import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  function logout() {
    setUser({});
    localStorage.removeItem("user");
  }

  return (
    <div
      className="h-[80vh] text-white bg-cover bg-top"
      style={{
        backgroundImage:
          "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
      }}
    >
      <header className="p-4 md:px-8">
        <nav className="flex justify-between">
          <ul className="flex gap-5">
            <Link to="/kompetisi"><li className="hidden md:block">Kompetisi</li></Link>
            <Link to="/music"><li className="hidden md:block">Music</li></Link>
            <Link to="/workshop"><li className="hidden md:block">Workshop</li></Link>
            <Link to="/others"><li className="hidden md:block">Others</li></Link>
          </ul>
          <ul className="flex gap-5">
            <li className="hidden md:block">USD</li>
            <li className="hidden md:block">Sell</li>
            <li className="hidden md:block">Points: {user.points}</li>
            <Link to="/login">
              <li className="hidden md:block">
                {user.name ? (
                  <span onClick={() => logout()}>Logout</span>
                ) : (
                  "Login"
                )}
              </li>
            </Link>
          </ul>
        </nav>
      </header>
      <section className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh]">
        <div className="bg-black p-4 text-center md:text-left md:w-1/2 md:ml-20 lg:ml-32">
          <h1 className="text-5xl md:text-6xl">
            {user.name ? `Welcome, ${user.name}!` : "Welcome!"}
          </h1>
          <h2 className="text-3xl md:text-4xl">
            Your next best night ever is waiting
          </h2>
          <h2 className="text-3xl md:text-4xl">And we have the tickets</h2>

          <div className="flex items-center mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2 text-white"
              viewBox="0 0 50 50"
            >
              <path
                fill="#FFFFFF"
                d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="What do you want to see live?"
              className="bg-white rounded-full px-4 py-2 w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
