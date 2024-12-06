import React, { useContext, useState } from "react";
import logo from "../assets/HomePage/Group 8.png";
import { FamilyTreeContext } from "../contexts/FamilyTreeContext";

const TopNavbar = () => {
  const { token } = useContext(FamilyTreeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed z-10 top-5 w-[100vw] m-auto p-auto align-middle px-4 lg:px-20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <a href="/">
            <img src={logo} className="w-12" alt="Logo" />
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex flex bg-black/80 lg:bg-white/10 lg:border gap-4 lg:border-white lg:border-opacity-20 lg:backdrop-blur-lg lg:rounded-full lg:w-auto flex-col lg:flex-row lg:items-center lg:justify-between absolute lg:static top-[100%] left-0 right-0 py-2 px-4 pl-10`}
        >
          <a
            href="/"
            className="text-white py-2 px-3 text-[16px] hover:text-green-400 transition duration-300 lg:inline-block"
          >
            HOME
          </a>
          <a
            href={token ? "/tree" : "/auth"}
            className="text-white py-2 px-3 text-[16px] hover:text-green-400 transition duration-300 lg:inline-block"
          >
            TREE
          </a>
          <a
            href={token ? "/tree" : "/auth"}
            className="text-white py-2 px-3 text-[16px] hover:text-green-400 transition duration-300 lg:inline-block"
          >
            CALENDAR
          </a>
          <a
            href={token ? "/tree" : "/auth"}
            className="text-white py-2 px-3 text-[16px] hover:text-green-400 transition duration-300 lg:inline-block"
          >
            CHAT
          </a>
          <a
            href="/about-us"
            className="text-white py-2 px-3 text-[16px] hover:text-green-400 transition duration-300 lg:inline-block"
          >
            ABOUT US
          </a>
          <a
            href="/auth"
            className="bg-green-600 text-white py-2 px-6 text-[16px] rounded-full hover:bg-green-700 transition duration-300 lg:inline-block mt-2 lg:mt-0"
          >
            {token ? "LOG OUT" : "LOG IN"}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
