import React from "react";
import logo from "../assets/HomePage/Group 8.png";
import dna from "../assets/HomePage/home_dna.png";
import blurry from "../assets/HomePage/blurry.png";
import familyPhoto from "../assets/HomePage/family-photo.png";
import calander from "../assets/HomePage/calander.png";
import YT from "../assets/HomePage/youtube 1.png";

import TopNavbar from "../components/TopNavbar";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center bg-black overflow-x-hidden pt-[100px] px-4 sm:px-6 lg:px-10">
      <div className="w-full mx-auto">
        <TopNavbar />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row text-left mb-20 items-start md:items-center md:justify-between gap-10">
          {/* Text Content */}
          <div className="max-w-full md:max-w-xl mb-10 md:mb-0 px-4 sm:px-0">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
              Building Bridges Between Generations
            </h1>
            <p className="text-white text-sm md:text-lg mb-6">
              Connect with your family story on{" "}
              <span className="text-green-400 font-bold">VanshikaRoots®</span>{" "}
              and discover the what, where, and who of how it all leads to you.
            </p>
            <button className="bg-green-600 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-lg font-semibold hover:bg-green-700 transition duration-300">
              Start Your Lineage
            </button>
          </div>

          {/* Decorative Circle */}
          <div className="relative">
            <img
              src={dna}
              alt=""
              className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw]"
            />
          </div>
          {/* <img src={blurry} className="absolute top-0 w-[1000px]" alt="" /> */}
        </div>
        {/* Feature Content */}
        <div className="w-[100%] px-10 flex flex-col gap-16 mb-32">
          {/* <img src={blurry} className="absolute -z-10 w-[1000px]" alt="" /> */}

          <h1 className="text-white text-3xl">FEATURES</h1>
          <div className="flex align-middle justify-between flex-wrap gap-4">
            {/* First Div with Hover Effect */}
            <div className="border-5 border-green-700 w-[15%] h-[225px] bg-green-800 rounded-[30px] group hover:cursor-pointer">
              <div className="flex group-hover:translate-x-3 group-hover:translate-y-3 transition duration-300 ease-in-out align-middle text-lg p-3 py-14 font-bold text-green-950 justify-center max-w-[100%] h-[225px] bg-[#43A67B] rounded-[30px]">
                Scalability and <br /> Multi-Level Trees
              </div>
            </div>

            {/* Second Div with Hover Effect */}
            <div className="border-5 border-green-700 w-[15%] h-[225px] bg-green-800 rounded-[30px] group hover:cursor-pointer">
              <div className="flex group-hover:translate-x-3 group-hover:translate-y-3 transition duration-300 ease-in-out align-middle text-lg p-3 py-14 font-bold text-green-950 justify-center max-w-[100%] h-[225px] bg-[#43A67B] rounded-[30px]">
                Smart Data Sharing
              </div>
            </div>

            {/* Third Div with Hover Effect */}
            <div className="border-5 border-green-700 w-[15%] h-[225px] bg-green-800 rounded-[30px] group hover:cursor-pointer">
              <div className="flex group-hover:translate-x-3 group-hover:translate-y-3 transition duration-300 ease-in-out align-middle text-lg p-3 py-14 font-bold text-green-950 justify-center max-w-[100%] h-[225px] bg-[#43A67B] rounded-[30px]">
                Two-Stage Authentication
              </div>
            </div>

            {/* Fourth Div with Hover Effect */}
            <div className="border-5 border-green-700 w-[15%] h-[225px] bg-green-800 rounded-[30px] group hover:cursor-pointer">
              <div className="flex group-hover:translate-x-3 group-hover:translate-y-3 transition duration-300 ease-in-out align-middle text-lg p-3 py-14 font-bold text-green-950 justify-center max-w-[100%] h-[225px] bg-[#43A67B] rounded-[30px]">
                Visual Family Tree Representation
              </div>
            </div>

            {/* Fifth Div with Hover Effect */}
            <div className="border-5 border-green-700 w-[15%] h-[225px] bg-green-800 rounded-[30px] group hover:cursor-pointer">
              <div className="flex group-hover:translate-x-3 group-hover:translate-y-3 transition duration-300 ease-in-out align-middle text-lg p-3 py-14 font-bold text-green-950 justify-center max-w-[100%] h-[225px] bg-[#43A67B] rounded-[30px]">
                Calendar Integration
              </div>
            </div>
          </div>
        </div>

        {/* Chat Feature Content */}
        <div className="flex gap-12 mb-40 w-[100%]">
          <img src={familyPhoto} alt="" className="w-[500px] h-[500px]" />
          <img src={blurry} className="absolute w-[1000px]" alt="" />

          <div className="flex flex-col gap-8 text-left">
            <div>
              <h1 className="text-4xl  text-green-700 font-bold mb-4">
                STAY CONNECTED!
              </h1>
              <p className="text-[17px] max-w-[520px] text-white font-medium">
                Join the conversation with our Family Chatbox! This is the
                perfect space to connect with family members, share updates, and
                reminisce about fond memories.
              </p>
            </div>

            <button className="bg-[#43A67B] w-[250px] text-white py-2 text-[16px] px-6 rounded-full hover:bg-green-700 transition duration-300">
              Join Chatbox
            </button>
            <div className="flex justify-between gap-6 w-[100%]">
              {/* First Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">Real-time messaging</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Instant communication with family members across the globe.
                </p>
              </div>

              {/* Second Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">Group Chatbox</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Create groups for specific branches of your family or for
                  planning events.
                </p>
              </div>

              {/* Third Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">Emojis & Stickers</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Add a little fun to your conversations!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Calender Featute Content */}
        <div className="flex gap-20 mb-32 w-[100%]">
          <div className="flex flex-col gap-12 text-left">
            <div>
              <h1 className="text-4xl  text-green-700 font-bold mb-4">
                Never Miss an Event{" "}
              </h1>
              <p className="text-[17px]  text-white font-medium">
                Keep track of all family gatherings with our Family Events
                Calendar. Whether it’s birthdays, reunions, or holiday
                celebrations, stay updated and connected.
              </p>
            </div>

            <img src={blurry} className="absolute w-[1000px]" alt="" />

            <div className="flex justify-between gap-6 w-[100%]">
              {/* First Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">Event Creation</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Easily add and manage family events.{" "}
                </p>
              </div>

              {/* Second Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">RSVP Options</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Let everyone know if you can make it!
                </p>
              </div>

              {/* Third Card */}
              <div className="flex flex-col bg-[#43A67B] black w-[200px] h-[230px] p-5 rounded-2xl shadow-lg border border-green-400">
                <h3 className="text-xl font-bold mb-4">Reminders</h3>
                <p className="text-sm font-semibold text-[#252525]">
                  Get notifications for upcoming events to ensure you never miss
                  a celebration.{" "}
                </p>
              </div>
            </div>
            <button className="bg-[#43A67B] w-[250px] text-white py-2 text-[16px] px-6 rounded-full hover:bg-green-700 transition duration-300">
              Add Event
            </button>
          </div>
          <img src={calander} alt="" className="w-[500px] h-[500px]" />
        </div>
        <div className="flex flex-col align-middle justify-center w-[100%]">
          <h1 className="text-3xl text-white font-bold text-left">
            Do you know how to create a tree ?
          </h1>
          <div className="w-[90vw] mt-16 flex align-middle justify-center">
            <div className="bg-gray-400 rounded-2xl w-[70%] h-[70vh] flex justify-center align-middle">
              <img src={YT} alt="" className="w-20 h-20 m-[22%]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <h1 className="text-4xl font-semibold text-green-500 mb-8">FAQ's</h1>
          <div className="w-full max-w-3xl space-y-4">
            {/* FAQ Item */}
            <div className="border border-green-500 px-6 py-4 rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors">
              <p className="text-white font-medium">
                Horem ipsum dolor sit amet, consectetur adipiscing elit?
              </p>
            </div>

            {/* FAQ Item */}
            <div className="border border-green-500 px-6 py-4 rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors">
              <p className="text-white font-medium">
                Horem ipsum dolor sit amet, consectetur adipiscing elit?
              </p>
            </div>

            {/* FAQ Item */}
            <div className="border border-green-500 px-6 py-4 rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors">
              <p className="text-white font-medium">
                Horem ipsum dolor sit amet, consectetur adipiscing elit?
              </p>
            </div>

            {/* FAQ Item */}
            <div className="border border-green-500 px-6 py-4 rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors">
              <p className="text-white font-medium">
                Horem ipsum dolor sit amet, consectetur adipiscing elit?
              </p>
            </div>
          </div>

          <button className="mt-8 bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 flex items-center">
            View More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {/* Quote Section */}
        <div className="flex justify-center items-center mt-20 py-20">
          <div className="relative bg-black text-white w-[80%] max-w-3xl rounded-[26px] p-20 border-2 border-green-600">
            {/* Green Shapes */}
            <div className="absolute top-[-30px] left-[-30px] w-24 h-24 bg-green-600 rounded-[26px]"></div>
            <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 bg-green-600 rounded-[26px]"></div>

            {/* Quote Text */}
            <blockquote className="text-xl italic font-semibold text-center">
              "In family life, love is the oil that eases friction, the cement
              that binds closer together, and the music that brings harmony."
            </blockquote>
            <p className="text-right mt-4 text-sm font-medium">
              — Friedrich Nietzsche
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-black border-t-2 py-10 px-6 mt-16">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Logo Section */}
            <div className="flex flex-col items-start">
              <img src={logo} alt="Logo" className="w-12 h-12 mb-4" />
            </div>

            {/* Product Links */}
            <div className="text-white">
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>Updates</li>
                <li>Security</li>
                <li>Chrome Extension</li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="text-white">
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About</li>
                <li>Blog</li>
                <li>Join Us</li>
              </ul>
            </div>

            {/* Industry Links */}
            <div className="text-white">
              <h3 className="font-bold mb-4">Industries</h3>
              <ul className="space-y-2">
                <li>Startups</li>
                <li>Venture Capital</li>
                <li>Private Equity</li>
              </ul>
            </div>

            {/* Help Links */}
            <div className="text-white">
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>Talk to Support</li>
                <li>Support Docs</li>
                <li>API Docs</li>
                <li>System Status</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
