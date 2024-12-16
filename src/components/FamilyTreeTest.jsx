import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import axios from "axios"; // Import axios for API calls
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Cookies from "js-cookie";

// Sample Family Tree Data

// Custom node rendering function to match the UI
const renderCustomNodeElement = ({
  nodeDatum,
  toggleNode,
  onAddMember,
  onViewMember,
}) => {
  const { name, attributes, children } = nodeDatum;
  const dob = attributes?.DOB || "";
  const hasChildren = children && children.length > 0;

  return (
    <g>
      <rect
        width="300"
        height="120"
        x="-150"
        y="-40"
        fill="#C8FF53"
        stroke="none"
        rx="5"
        ry="5"
        onClick={() => onViewMember(nodeDatum)}
        style={{ cursor: "pointer" }}
      />
      <text
        fill="#000000"
        x="-120"
        y="15"
        textAnchor="right"
        fontSize="30"
        fontWeight="bold"
      >
        {name}
      </text>
      <text fill="#545454" x="-120" y="50" textAnchor="right" fontSize="22">
        {dob}
      </text>
      <text
        fill="#043500"
        x="120"
        y="0"
        textAnchor="middle"
        fontSize="40"
        fontWeight="middle"
        onClick={onAddMember}
        style={{ cursor: "pointer" }}
      >
        +
      </text>
      {hasChildren && (
        <text
          fill="#043500"
          x="120"
          y="60"
          textAnchor="middle"
          fontSize="30"
          fontWeight="middle"
          onClick={toggleNode}
          style={{ cursor: "pointer" }}
        >
          {nodeDatum.__rd3t.collapsed ? "↓" : "↑"}
        </text>
      )}
    </g>
  );
};

// Family Tree Component
const FamilyTree = ({ token }) => {
  const [translate] = useState({ x: 400, y: 100 });
  const [familyTreeData, setFamilyTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [x, y] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    relation: "Spouse",
  });

  useEffect(() => {
    const fetchFamilyTreeData = async () => {
      console.log(token);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
          withCredentials: true, // Include cookies in the request
        };

        console.log("Fetching with config", config);

        const response = await axios.get(`${Backend_api}/api/families`, config);

        // setFamilyTreeData(response.data);
        setFamilyTreeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching family tree data:", error);
        setError("Failed to fetch family tree data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTreeData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Show add form pop-up
  const handleAddMember = () => {
    setShowAddForm(true);
  };

  // Close add form pop-up
  const closeAddForm = () => {
    setShowAddForm(false);
  };

  // Show member info pop-up
  const handleViewMember = (member) => {
    setSelectedMember(member);
    setShowMemberInfo(true);
  };

  // Close member info pop-up
  const closeMemberInfo = () => {
    setShowMemberInfo(false);
    setSelectedMember(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${Backend_api}/api/families`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      // Close form and reset data on successful submission
      closeAddForm();
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div
      id="treeWrapper"
      className="w-full h-screen bg-green-100 overflow-hidden relative"
    >
      <Tree
        data={familyTreeData}
        translate={translate}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={true}
        zoomable={true}
        pan={true}
        zoom={0.8}
        scaleExtent={{ min: 0.1, max: 2 }}
        nodeSize={{ x: 400, y: 200 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNodeElement({
            ...rd3tProps,
            toggleNode: rd3tProps.toggleNode,
            onAddMember: handleAddMember,
            onViewMember: handleViewMember,
          })
        }
        styles={{
          nodes: {
            node: { circle: { fill: "#81c784" } },
            leafNode: { circle: { fill: "#66bb6a" } },
          },
          links: {
            stroke: "#2e7d32",
            strokeWidth: 2,
          },
        }}
      />

      {/* Add Member Form Pop-up */}
      {showAddForm && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeAddForm}
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              Add Family Member
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <input
                type="date"
                name="dob"
                placeholder="DOB"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              {/* <select
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="Spouse">Spouse</option>
                <option value="Husband">Husband</option>
                <option value="Children">Children</option>
              </select> */}
              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Member Info Pop-up */}
      {showMemberInfo && selectedMember && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeMemberInfo}
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              {selectedMember.name}
            </h2>
            <p className="text-green-700">
              <strong>DOB:</strong> {selectedMember.attributes?.DOB}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
