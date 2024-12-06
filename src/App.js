import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login.tsx";
import FamilyTreeMain from "./pages/FamilyTree.tsx";
import HomePage from "./pages/HomPage.jsx";
import Profile from "./pages/Profile.jsx";
import { FamilyTreeProvider } from "./contexts/FamilyTreeContext"; // Import the context
import Chat from "./pages/Chat.jsx";
import Calandar from "./pages/Calandar.jsx";

function App() {
  return (
    <div className="App">
      <FamilyTreeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/tree" element={<FamilyTreeMain />} />
            <Route path="/profile/:member_id" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calandar" element={<Calandar />} />
          </Routes>
        </Router>
      </FamilyTreeProvider>
    </div>
  );
}

export default App;
