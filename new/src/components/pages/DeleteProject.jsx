import React from "react";
const DeleteProject = ({ projectId, setProjects }) => {
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
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteProject;
