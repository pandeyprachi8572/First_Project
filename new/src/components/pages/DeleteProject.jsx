// import React from "react";
// const DeleteProject = ({ projectId, setProjects }) => {
//   const token = localStorage.getItem("token");
//   const handleDelete = async () => {
//     try {
//       await fetch(`http://localhost:3333/api/projects/4/${projectId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProjects((prevProjects) =>
//         prevProjects.filter((project) => project.project_id !== projectId)
//       );
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };
//   return (
//     <button
//       onClick={handleDelete}
//       className="bg-red-500 text-white px-4 py-2 rounded"
//     >
//       Delete
//     </button>
//   );
// };

// export default DeleteProject;

import React, { useState } from "react";

const DeleteProject = ({ projectId, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3333/api/projects/4/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.project_id !== projectId)
      );
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)} // Close the modal on cancel
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProject;
