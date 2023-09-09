import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white relative text-orange-600 text-md font-semibold mb-7 p-5 w-full shadow-lg ">
      <div className="flex flex-row lg:flex-row lg:justify-between md:flex-col">
        <div className="md:hidden">
          <FaBars className="mb-5" onClick={toggleMenu} />
        </div>
        <ul
          className={`lg:flex lg:ml-5 lg:gap-5 ${
            isMenuOpen ? "hidden md:flex-col" : "lg:flex-row md:flex hidden"
          }`}
        >
          <li>Sports</li>
          <li>Music</li>
          <li>Shows</li>
          <li>Cities</li>
        </ul>
        <ul
          className={`lg:flex lg:ml-5 lg:gap-5 ${
            isMenuOpen ? "hidden md:flex-col" : "lg:flex-row md:flex hidden"
          }`}
        >
          <li>USD</li>
          <li>Sell</li>
          <li>Points</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
