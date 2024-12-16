import React, { useState, useCallback, useContext } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FamilyTreeContext } from "../contexts/FamilyTreeContext";

// const s3 = new AWS.S3();
const AddFamilies = ({
  onAddNewMember,
  parentNode,
  setShowAddFamiliesForm,
  familyTreeExist,
}) => {
  const { token, familyTreeData, backendApiUrl } =
    useContext(FamilyTreeContext);
  const [formData, setFormData] = useState({
    image: [],
    name: "",
    dob: "",
    gender: "",
    placeOfBirth: "",
    bio: "",
    spouseInfo: "",
    dateOfDeath: "",
    contact: "",
    maritalStatus: "",
  });
  const [selectedImages, setSelectedImages] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const findAndAddMember = (data, parentId, newMember) => {
    if (data.member_id === parentId) {
      //console.log(`Found the parent with member_id: ${parentId}`);
      data.children = [...(data.children || []), newMember];
      console.log("new member = ", newMember);
      //console.log("Updated parent's children:", data.children);
      return true;
    }

    if (data.children) {
      for (let i = 0; i < data.children.length; i++) {
        if (findAndAddMember(data.children[i], parentId, newMember)) {
          return true;
        }
      }
    }
    return false;
  };

  // const handleImageUpload = async (file) => {
  //   try {
  //     const params = {
  //       Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
  //       Key: file.name,
  //       Body: file,
  //       ContentType: file.type,
  //       ACL: "public-read", // Optional: adjust based on your bucket policy
  //     };

  //     // const data = await s3.upload(params).promise();
  //     console.log("File uploaded successfully:", data.Location);
  //     return data.Location; // Return the URL of the uploaded file
  //   } catch (error) {
  //     console.error("Error uploading to S3:", error);
  //     throw error;
  //   }
  // };

  const handleSubmit = (e) => {
    console.log(token);
    e.preventDefault();
    if (!formData.name || !formData.dob) {
      console.log("Form is incomplete");
      return;
    }

    if (familyTreeExist) {
      console.log("yes! Family tree exists");
      try {
        console.log("trying...");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const addChild = async () => {
          console.log("Preparing FormData...");

          const formDataPayload = new FormData();
          formDataPayload.append("parent_id", parentNode);
          formDataPayload.append("name", formData.name);
          console.log("image is ", selectedImages);

          // Append image separately
          // if (selectedImages) {
          //   try {
          //     // const imageUrl = await uploadFile(selectedImages);
          //     // formDataPayload.append("image", imageUrl);
          //     S3FileUpload.uploadFile(selectedImages, s3Config)
          //       .then((data) => console.log(data))
          //       .catch((err) => console.error(err));
          //   } catch (error) {
          //     console.error("Image upload failed", error);
          //     return;
          //   }
          // }

          // Append other attributes as JSON string
          formDataPayload.append(
            "attributes",
            JSON.stringify({
              DOB: formData.dob,
              gender: formData.gender,
              placeOfBirth: formData.placeOfBirth,
              bio: formData.bio,
              spouseInfo: formData.spouseInfo,
              dateOfDeath: formData.dateOfDeath,
              contact: formData.contact,
              maritalStatus: formData.maritalStatus,
            })
          );

          try {
            for (let [key, value] of formDataPayload.entries()) {
              console.log("payload data hai ye ", `${key}:`, value);
            }
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            };

            const response = await axios.post(
              `${backendApiUrl}/api/families/addChild`,
              formDataPayload,
              config
            );

            // Step 7: Check response status
            console.log("Server response received:", response);

            if (response.status === 201) {
              alert("Family tree saved successfully!");
              console.log("Family tree saved successfully.");
            } else {
              console.error("Failed to save the family tree:", response.data);
            }
          } catch (error) {
            console.error("Error adding child:", error);
          }
        };

        addChild();
      } catch (e) {
        console.log("adding child error is", e);
      }
    }

    const newMemberData = {
      member_id: familyTreeData
        ? `${parentNode}.${(familyTreeData.children || []).length + 1}`
        : "1",
      name: formData.name,
      attributes: {
        image: selectedImages,
        DOB: formData.dob,
        gender: formData.gender,
        placeOfBirth: formData.placeOfBirth,
        bio: formData.bio,
        spouseInfo: formData.spouseInfo,
        dateOfDeath: formData.dateOfDeath,
        contact: formData.contact,
        maritalStatus: formData.maritalStatus,
      },
      children: [],
    };

    let familyTreeCopy;

    if (!familyTreeData) {
      familyTreeCopy = newMemberData;
    } else {
      familyTreeCopy = JSON.parse(JSON.stringify(familyTreeData));
      const isParentFound = findAndAddMember(
        familyTreeCopy,
        parentNode,
        newMemberData
      );

      if (!isParentFound) {
        console.log(`Parent with member_id: ${parentNode} not found.`);
      }
    }

    onAddNewMember(familyTreeCopy);
    setFormData({ name: "", dob: "" });
    setShowAddFamiliesForm(false);
  };

  return (
    <div className="absolute top-0 inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-lg p-6 w-[80vw] shadow-md relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={() => setShowAddFamiliesForm(false)}
        >
          x
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Add Family Member
        </h2>
        <form
          className="flex flex-col  w-[100%] align-middle justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="md:flex gap-3 w-[100%] align-middle justify-between">
            <div className="space-y-4 w-[100%] md:w-[50%]">
              {/* Drag and Drop Area for Image Upload */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed py-6 rounded-md p-4 text-center cursor-pointer ${
                  isDragActive ? "border-green-500" : "border-green-300"
                }`}
              >
                <input {...getInputProps()} disabled />
                {isDragActive ? (
                  <p className="text-green-600">Drop the image here...</p>
                ) : (
                  <p>
                    Drag & drop an image here, or{" "}
                    <span className="text-green-500 underline">
                      select from your device
                    </span>
                  </p>
                )}
                {selectedImages && (
                  <p className="mt-2 text-green-700">
                    Selected file: {selectedImages.name}
                  </p>
                )}
              </div>

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
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="placeOfBirth"
                placeholder="Place of Birth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="space-y-4 w-[100%] md:w-[50%]">
              <textarea
                name="bio"
                placeholder="Biography/Notes"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="spouseInfo"
                placeholder="Spouse Information"
                value={formData.spouseInfo}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <input
                type="date"
                name="dateOfDeath"
                placeholder="Date of Death (if applicable)"
                value={formData.dateOfDeath}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />

              <input
                type="text"
                name="contact"
                placeholder="Contact (Optional)"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFamilies;
