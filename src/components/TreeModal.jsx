import React from "react";

const TreeModal = ({ isOpen, closeModal, nodeDatum }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Edit Person Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First and Middle Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={nodeDatum.name}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={nodeDatum.attributes?.DOB}
              readOnly
            />
          </div>
          {/* Add more form fields as needed */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreeModal;
