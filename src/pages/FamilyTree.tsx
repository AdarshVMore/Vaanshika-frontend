import React, { useContext } from "react";
import TopNavbar from "../components/TopNavbar";
import SidebarAndToolbar from "../components/SidebarAndToolbar";
import FamilyTree from "../components/FamilyTree";

function FamilyTreeMain() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="flex">
        {/* <SidebarAndToolbar /> */}
        <div className="flex-1">
          <FamilyTree />
        </div>
      </div>
    </div>
  );
}

export default FamilyTreeMain;
