import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import { FamilyTreeContext } from "../contexts/FamilyTreeContext";
// import defaultImage from "../assets/defaultImage.png"; // Add default image

const formatDate = (dateObj) => {
  if (!dateObj) return "N/A";
  const dateValue = dateObj.$date?.$numberLong || dateObj.$date || null;
  if (!dateValue) return "N/A";
  return new Date(parseInt(dateValue, 10)).toLocaleDateString();
};

const findMemberById = (familyTree, memberId) => {
  if (!familyTree || !familyTree.children) return null;
  const path = memberId.split(".");
  let currentMember = familyTree;

  for (let i = 0; i < path.length; i++) {
    const index = parseInt(path[i]) - 1;
    if (!currentMember.children || !currentMember.children[index]) {
      return null;
    }
    currentMember = currentMember.children[index];
  }

  return currentMember;
};

const Profile = () => {
  const { token, familyTreeData } = useContext(FamilyTreeContext);
  const { member_id } = useParams();
  const selectedMember = findMemberById(familyTreeData, member_id);

  if (!selectedMember) {
    return <p className="text-center text-white">Member not found</p>;
  }

  return (
    <div className="profile-page bg-gray-900 min-h-screen text-white">
      <TopNavbar />
      <div className="container mx-auto py-28 px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              {/* <img
                src={
                  selectedMember.attributes.image === "mem1"
                    ? mem1
                    : selectedMember.attributes.image === "mem2"
                    ? mem2
                    : selectedMember.attributes.image === "mem3"
                    ? mem3
                    : defaultImage
                }
                alt={selectedMember.name}
                className="rounded-full shadow-md w-40 h-40 object-cover"
              /> */}
            </div>
            <h1 className="text-4xl font-semibold mb-2">
              {selectedMember.name}
            </h1>
            <p className="text-gray-400 mb-4">
              Patriarch of the{" "}
              {
                familyTreeData.name.split(" ")[
                  familyTreeData.name.split(" ").length - 1
                ]
              }{" "}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {formatDate(selectedMember.attributes.DOB)}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {selectedMember.attributes.gender || "N/A"}
              </p>
              <p>
                <strong>Place of Birth:</strong>{" "}
                {selectedMember.attributes.placeOfBirth || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Spouse:</strong>{" "}
                {selectedMember.attributes.spouseInfo || "N/A"}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {selectedMember.attributes.contact || "N/A"}
              </p>
              <p>
                <strong>Marital Status:</strong>{" "}
                {selectedMember.attributes.maritalStatus || "N/A"}
              </p>
            </div>
          </div>

          {selectedMember.attributes.dateOfDeath && (
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                <strong>Date of Death:</strong>{" "}
                {formatDate(selectedMember.attributes.dateOfDeath)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
