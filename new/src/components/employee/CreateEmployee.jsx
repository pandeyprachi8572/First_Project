import React, { useState } from "react";

const CreateEmployee = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    group_id: "",
    group_name: "",
    profile_url: "",
    user_id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newEmployee = await response.json();
        onCreate(newEmployee);
        onClose();
      } else {
        console.error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" inset-0  bg-opacity-50 flex  justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Create Employee</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor={key}>
                {key.replace("_", " ")}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
