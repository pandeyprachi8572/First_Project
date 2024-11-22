import React, { useState } from "react";
const EditProject = ({ project, onUpdate, setProjects }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    project_name: project.project_name,
    budget: project.budget,
    current_cost: project.current_cost,
    actual_cost: project.actual_cost,
    is_critical: project.is_critical,
    project_manager_emails: project.project_manager_emails,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3333/api/projects/5/${project.project_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedProject = await response.json();
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.project_id === updatedProject.project_id ? updatedProject : p
        )
      );
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      {showPopup && (
        <div className="  fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6  w-6/12   rounded shadow-lg   ">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Project Name</label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full border px-3 py-2   rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Current Cost</label>
                <input
                  type="number"
                  name="current_cost"
                  value={formData.current_cost}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Actual Cost</label>
                <input
                  type="number"
                  name="actual_cost"
                  value={formData.actual_cost}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Is Critical</label>
                <input
                  type="checkbox"
                  name="is_critical"
                  checked={formData.is_critical}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{formData.is_critical ? "Yes" : "No"}</span>
              </div>
              <div>
                <label className="block text-gray-700">
                  Project Manager Emails
                </label>
                <input
                  type="text"
                  name="project_manager_emails"
                  value={formData.project_manager_emails}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProject;
