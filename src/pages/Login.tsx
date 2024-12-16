import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login-img.png"; // Replace with your image path
import { FamilyTreeContext } from "../contexts/FamilyTreeContext";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { token, setToken, backendApiUrl } = useContext(FamilyTreeContext);
  console.log(backendApiUrl); // Should print the URL if configured correctly

  // Function to handle toggle between login and sign up
  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  // Function to handle form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Sign Up Request
        const response = await axios.post(
          `${backendApiUrl}/api/auth/register`,
          {
            username,
            email,
            password,
          }
        );
        console.log("Sign Up Success:", response.data);
        // Optionally handle post-signup actions
      } else {
        // Login Request
        const response = await axios.post(`${backendApiUrl}/api/auth/login`, {
          email,
          password,
        });
        setToken(response.data.token);
        console.log(token);
        console.log("Login Success:", response.data.token, response);
        localStorage.setItem("token", response.data.token);
        // Handle success (e.g., save token, redirect)
        navigate("/tree"); // Redirect to /tree route
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen text-left flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-black overflow-hidden">
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        {/* Container for sliding effect */}
        <div
          className={`flex transition-transform duration-1000 ease-in-out transform ${
            isSignUp ? "" : ""
          }`}
        >
          {/* Left Side - Form Component */}
          <div
            className={`w-1/2 p-8 flex flex-col transition-transform duration-1000 ease-in-out ${
              isSignUp ? "translate-x-[600px]" : "translate-x-0"
            }`}
          >
            <h1 className="text-white text-4xl font-bold mb-8">
              {isSignUp ? "Sign Up" : "Log In"}
            </h1>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label className="block text-white text-lg mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 text-white border border-white rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-white text-lg mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 text-white border border-white rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-white text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 text-white border border-white rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded shadow-lg hover:bg-green-700 transition duration-300"
              >
                {isSignUp ? "SIGN UP" : "LOG IN"}
              </button>
            </form>
            <div className="text-white mt-6 text-center">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="text-green-500 hover:text-green-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="text-green-500 hover:text-green-700 focus:outline-none"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Image Component */}
          <div
            className={`w-1/2 p-8 flex items-center justify-center transition-transform duration-1000 ease-in-out ${
              isSignUp ? "-translate-x-[600px]" : "translate-x-0"
            }`}
          >
            <img src={loginImg} alt="Login" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
