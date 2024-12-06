import React, { useState, useEffect, useContext } from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import AddFamilies from "./AddFamilies";
import { FamilyTreeContext } from "../contexts/FamilyTreeContext";

// Custom node rendering function to match the UI

const formatDate = (dob) => {
  if (!dob) return ""; // Handle empty or invalid dates
  const date = new Date(dob);
  const options = { year: "numeric", month: "long", day: "numeric" }; // Format: 20 March 1952
  return date.toLocaleDateString(undefined, options); // Use default locale
};

const renderCustomNodeElement = ({
  nodeDatum,
  toggleNode,
  onAddMember,
  onViewMember,
  setSelectedParentNode,
}) => {
  if (!nodeDatum) return null;

  const { image, name, attributes, children } = nodeDatum;
  const dob = attributes?.DOB || "";
  const hasChildren = children && children.length > 0;

  // Dynamic width calculation
  const charWidth = 20; // Average width of one character
  const padding = 30; // Padding around the text
  const rectWidth = name.length * charWidth + padding * 2;

  // Dynamic position for "+"
  const plusPositionX = rectWidth / 2 - 20; // Offset `20` for centering the "+"
  const plusPositionY = 0;

  // Dynamic position for up/down arrow
  const arrowPositionX = rectWidth / 2 - 20; // Align arrow to the right edge of the rectangle
  const arrowPositionY = 60;

  // Utility function to format the DOB

  return (
    <g>
      {nodeDatum.attributes?.image ? (
        <image
          href={`https://family-tree-adarsh.s3.amazonaws.com/${nodeDatum.attributes.image}`}
          width="300"
          height="300"
          x="-150"
          y="-320"
          alt="Node image"
        />
      ) : null}

      <rect
        width={rectWidth}
        height="120"
        x={-rectWidth / 2} // Center the rectangle
        y="-40"
        fill={nodeDatum.attributes.dateOfDeath ? "orange" : "#C8FF53"}
        rx="5"
        ry="5"
        onClick={() => onViewMember(nodeDatum)}
        style={{ cursor: "pointer" }}
      />

      <text
        fill="#000000"
        x={-rectWidth / 2 + padding} // Align text with padding
        y="15"
        textAnchor="start"
        fontSize="30"
        fontWeight="bold"
      >
        {name}
      </text>

      <text
        fill="#545454"
        x={-rectWidth / 2 + padding} // Align text with padding
        y="50"
        textAnchor="start"
        fontSize="22"
      >
        {formatDate(dob)}
      </text>

      <text
        fill="#043500"
        x={plusPositionX}
        y={plusPositionY}
        textAnchor="middle"
        fontSize="40"
        fontWeight="middle"
        onClick={() => {
          onAddMember(nodeDatum);
          setSelectedParentNode(nodeDatum.member_id);
        }}
        style={{ cursor: "pointer" }}
      >
        +
      </text>

      {hasChildren && (
        <text
          fill="#043500"
          x={arrowPositionX}
          y={arrowPositionY}
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
const FamilyTree = () => {
  const [translate] = useState({ x: 400, y: 100 });
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const {
    token,
    familyTreeData,
    setFamilyTreeData,
    familyTreeExist,
    showAddFamiliesForm,
    selectedParentNode,
    loading,
    setLoading,
    setSelectedParentNode,
    setShowAddFamiliesForm,
  } = useContext(FamilyTreeContext);
  // const [showAddForm, setShowAddForm] = useState(false);

  // useEffect(() => {
  //   const fetchFamilyTreeData = async () => {
  //     //console.log("Fetching family tree data with token:", token);

  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       };

  //       const response = await axios.get(
  //         "https://family-tree-backend-om.onrender.com/api/families",
  //         config
  //       );
  //       console.log("Fetched family tree data:", response.data);

  //       setFamilyTreeData(response.data);
  //       localStorage.setItem("familyData", response.data);
  //       // setFamilyTreeData(SampleFamilyTree);
  //       setFamilyTreeExist(true);
  //     } catch (error) {
  //       setSelectedParentNode("1");
  //       if (!familyTreeData) {
  //         setShowAddFamiliesForm(true);
  //       }
  //       console.error("Error fetching family tree data:", error);
  //       setError("Failed to fetch family tree data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFamilyTreeData();
  // }, [token]);

  const getNodeSizeX = (node) => {
    // Set a base size for X (horizontal spacing)
    const baseXSize = 600;

    // If node has children, increase the X size proportionally
    if (node.children && node.children.length > 0) {
      // Multiply the base size by the number of children (scaling factor can be adjusted)
      return baseXSize + node.children.length * 120;
    }

    // Default X size if no children
    return baseXSize;
  };

  const handleAddMember = (parentNode) => {
    setSelectedParentNode(parentNode.member_id);
    setShowAddFamiliesForm(true); // Show the form
  };

  const handleAddNewMember = (newMember) => {
    //console.log("New member is:", newMember);

    // const updateTree = (node) => {
    //   if (selectedParentNode) {
    //     if (node.member_id === selectedParentNode.member_id) {
    //       //console.log("Adding new member to parent:", node);
    //       node.children = [...(node.children || []), newMember];
    //       //console.log("Updated children:", node.children);
    //     }
    //   } else if (node.children) {
    //     node.children.forEach(updateTree);
    //   }
    // };

    setFamilyTreeData(() => {
      // Create a deep copy of the family tree data
      const newData = JSON.parse(JSON.stringify(newMember));
      // Update the tree
      setFamilyTreeData(newData);
      //console.log("Updated familyTreeData before setting state:", newData);
      return newData;
    });

    setShowAddFamiliesForm(false);
    setSelectedParentNode(null);
  };

  const saveFamilyTree = async () => {
    if (!familyTreeData) {
      console.error("No family tree data to save.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "https://family-tree-backend-om.onrender.com/api/families",
        familyTreeData,
        config
      );

      if (response.status === 201) {
        //console.log("Family tree saved successfully:", response.data);
        alert("Family tree saved successfully!");
      } else {
        console.error("Failed to save the family tree:", response.data);
      }
    } catch (error) {
      console.error("Error saving the family tree:", error);
      alert("An error occurred while saving the family tree.");
    }
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setShowMemberInfo(true);
  };

  // Close member info pop-up
  const closeMemberInfo = () => {
    setShowMemberInfo(false);
    setSelectedMember(null);
  };

  const getPathClass = ({ source, target }) => {
    // if (!target.children) {
    //   return "link__to-leaf"; // Link to a leaf node
    // }
    return "custom-link"; // Use custom class for branch links
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      id="treeWrapper"
      className="w-full h-screen bg-black overflow-hidden relative"
    >
      <h1 className="text-white text-sm lg:text-xl font-bold text-left mt-32 lg:mt-28 ml-5 lg:ml-20">
        {
          familyTreeData.name.split(" ")[
            familyTreeData.name.split(" ").length - 1
          ]
        }{" "}
        Family
      </h1>
      {familyTreeData && (
        <Tree
          data={familyTreeData} // Tree data
          translate={translate}
          orientation="vertical"
          pathFunc="elbow"
          collapsible={true}
          zoomable={true}
          pan={true}
          zoom={0.8}
          scaleExtent={{ min: 0.01, max: 2 }}
          // Dynamically calculate node size based on number of children
          nodeSize={{
            x: getNodeSizeX(familyTreeData), // Dynamically set X value based on the number of children
            y: 800, // Y value remains fixed
          }}
          renderCustomNodeElement={(rd3tProps) =>
            renderCustomNodeElement({
              ...rd3tProps,
              setSelectedParentNode, // Pass the function to set the selected parent node
              onAddMember: handleAddMember,
              onViewMember: handleViewMember,
            })
          }
          pathClassFunc={getPathClass} // Assign the path class function
          rootNodeClassName="node__root" // Style for root node
          branchNodeClassName="node__branch" // Style for branch nodes
          leafNodeClassName="node__leaf" // Style for leaf nodes
        />
      )}

      {showAddFamiliesForm && (
        <AddFamilies
          onAddNewMember={handleAddNewMember}
          parentNode={selectedParentNode}
          setShowAddFamiliesForm={setShowAddFamiliesForm}
          familyTreeData={familyTreeData}
          familyTreeExist={familyTreeExist}
          token={token}
        />
      )}

      {showMemberInfo && selectedMember && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white text-left rounded-lg p-6 w-2/5 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeMemberInfo}
            >
              x
            </button>
            <a href={`/profile/${selectedMember.member_id}`}>
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                {selectedMember.name}
              </h2>
            </a>
            {selectedMember.attributes ? (
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                {/* Container for the image */}
                <div style={{ marginRight: "20px" }}>
                  {Object.entries(selectedMember.attributes).map(
                    ([key, value]) =>
                      key.toLowerCase().includes("image") ||
                      (typeof value === "string" &&
                        value.match(/\.(jpeg|jpg|gif|png)$/i)) ? (
                        <div key={key}>
                          <img
                            src={value}
                            alt={key}
                            style={{ maxWidth: "300px", maxHeight: "300px" }}
                          />
                        </div>
                      ) : null
                  )}
                </div>

                {/* Container for the rest of the attributes */}
                <div className="text-green-700">
                  {Object.entries(selectedMember.attributes).map(
                    ([key, value]) =>
                      !(
                        key.toLowerCase().includes("image") ||
                        (typeof value === "string" &&
                          value.match(/\.(jpeg|jpg|gif|png)$/i))
                      ) ? (
                        <>
                          {key === "DOB" ? (
                            <div key={key}>
                              <strong>{key}:</strong>
                              <p>{formatDate(value)}</p>
                            </div>
                          ) : (
                            <>
                              <div key={key}>
                                <strong>{key}:</strong>
                                <p>{value}</p>
                              </div>
                            </>
                          )}
                        </>
                      ) : null
                  )}
                </div>
              </div>
            ) : (
              <p className="text-green-700">
                No additional information available.
              </p>
            )}
          </div>
        </div>
      )}

      <button
        className={`${
          familyTreeExist ? "hidden" : ""
        } fixed top-24 right-20 text-white bg-green-700 rounded-full px-6 py-1`}
        onClick={saveFamilyTree}
      >
        Save
      </button>
    </div>
  );
};

export default FamilyTree;
