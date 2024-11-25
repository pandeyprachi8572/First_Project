import React, { useState } from "react";
const CreateData = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    group_id: "",
    group_name: "",
    profile_url: "",
    user_id: "",
    password: "",
  });

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newRow = await response.json();
        onSave(newRow);
        onClose();
      }
    } catch (error) {
      console.error("Error creating row:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Row</h2>
        <form className="space-y-3">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace("_", " ")}
              </label>
              <input
                type="text"
                value={formData[key]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
        </form>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateData;
