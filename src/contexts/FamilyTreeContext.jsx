import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FamilyTreeContext = createContext();

export const FamilyTreeProvider = ({ children }) => {
  const [showAddFamiliesForm, setShowAddFamiliesForm] = useState(false); // Track form visibility
  const [selectedParentNode, setSelectedParentNode] = useState(null); // Track selected parent node
  const [loading, setLoading] = useState(true);
  const backendApiUrl = "http://3.109.211.23:3000";
  // const backendApiUrl = "http://localhost:3000";
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [familyTreeExist, setFamilyTreeExist] = useState(false);
  const [familyTreeData, setFamilyTreeData] = useState(() => {
    try {
      const storedData = localStorage.getItem("familyTreeData");
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing familyTreeData:", error);
      return null;
    }
  });

  useEffect(() => {
    const fetchFamilyTreeData = async () => {
      //console.log("Fetching family tree data with token:", token);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        const response = await axios.get(
          `${backendApiUrl}/api/families`,
          config
        );
        console.log("Fetched family tree data:", response.data);

        setFamilyTreeData(response.data);
        localStorage.setItem("familyData", response.data);
        // setFamilyTreeData(SampleFamilyTree);
        setFamilyTreeExist(true);
      } catch (error) {
        setSelectedParentNode("1");
        if (!familyTreeData) {
          setShowAddFamiliesForm(true);
        }
        console.error("Error fetching family tree data:", error);
        // setError("Failed to fetch family tree data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTreeData();
  }, [token]);

  return (
    <FamilyTreeContext.Provider
      value={{
        token,
        setToken,
        familyTreeData,
        setFamilyTreeData,
        familyTreeExist,
        showAddFamiliesForm,
        selectedParentNode,
        setSelectedParentNode,
        setShowAddFamiliesForm,
        loading,
        setLoading,
        backendApiUrl,
      }}
    >
      {children}
    </FamilyTreeContext.Provider>
  );
};
