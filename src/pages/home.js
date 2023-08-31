import { useEffect, useState } from "react";
import Event from "../components/event";
import ModalComponent from "../components/modal";
import Register from "../components/register";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await api.get("/events");
    setEvents(response.data);
    console.log(response.data, events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const openRegisterModal = () => setModalIsOpen(true);
  const closeRegisterModal = () => setModalIsOpen(false);

  return (
    <div>
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
              <li className="hidden md:block">Sports</li>
              <li className="hidden md:block">Music</li>
              <li className="hidden md:block">Shows</li>
              <li className="hidden md:block">Cities</li>
            </ul>
            <ul className="flex gap-5">
              <li className="hidden md:block">USD</li>
              <li className="hidden md:block">Sell</li>
              <li className="hidden md:block">Support</li>
              <Link to="/login">
                <li className="hidden md:block">Login</li>
              </Link>
            </ul>
          </nav>
        </header>
        <section className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh]">
          <div className="bg-black p-4 text-center md:text-left md:w-1/2 md:ml-20 lg:ml-32">
            <h1 className="text-5xl md:text-6xl">Let there be live</h1>
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
      <hr className="my-4" />
      <section className="p-4 md:p-20 gap-5">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="bg-black text-white rounded p-4">Concerts</div>
          <div className="bg-black text-white rounded p-4">Sports</div>
          <div className="bg-black text-white rounded p-4">Theatre</div>
          <div className="bg-black text-white rounded p-4">Orchestra</div>
        </div>
      </section>
      <section className="p-4 md:p-20 gap-5">
        <h2 className="text-xl font-bold">Popular Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.slice(0, 3).map((event) => (
            <Event
              key={event.id}
              eventData={event}
              onOpenRegister={openRegisterModal}
            />
          ))}
        </div>
      </section>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-6 lg:py-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Helpful Links
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    My Account
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Refunds
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Help center
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Discord Server
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Licensing
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-100 dark:bg-gray-900 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © 2023 <a href="https://purwadhika.com/">Purwadhika</a>. All
              Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
                  ></path>
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              {/* Other social media links */}
            </div>
          </div>
        </div>
      </footer>
      <ModalComponent isOpen={modalIsOpen} onRequestClose={closeRegisterModal}>
        <Register />
      </ModalComponent>
    </div>
  );
}
