import React, { useState, useEffect } from "react";

const EditData = ({ employee, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3333/api/employees/${formData.desk_employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate(formData); // Update the employee list with the new data
        onClose(); // Close the modal
      } else {
        alert("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-start">Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-start">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="group_id" className="block text-start">Group ID</label>
            <input
              id="group_id"
              name="group_id"
              value={formData.group_id}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="group_name" className="block text-start">Group Name</label>
            <input
              id="group_name"
              name="group_name"
              value={formData.group_name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile_url" className="block text-start">Profile URL</label>
            <input
              id="profile_url"
              name="profile_url"
              value={formData.profile_url}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user_id" className="block text-start">User ID</label>
            <input
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-start">Password</label>
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
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
  );
};

export default EditData;
