import React, { useState } from "react";

const EditEmployee = ({ employee, onClose, onEdit }) => {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call to update the employee data
    onEdit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(employee).map((key) => (
            <div className="mb-3" key={key}>
              <label className="block font-semibold mb-1 capitalize">
                {key.replace("_", " ")}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
