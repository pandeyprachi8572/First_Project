import React, { useState } from "react";
const EditRow = ({ row, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: row.id,
    desk_employee_id: row.desk_employee_id,
    date: row.date,
    arrived: row.arrived || "",
    left: row.left || "",
    online_time: row.online_time || "",
    offline_time: row.offline_time || "",
    desktime_time: row.desktime_time || "",
    at_work_time: row.at_work_time || "",
    after_work_time: row.after_work_time || "",
    before_work_time: row.before_work_time || "",
    productive_time: row.productive_time || "",
    productivity: row.productivity || "",
    efficiency: row.efficiency || "",
    work_starts: row.work_starts || "",
    work_ends: row.work_ends || "",
    late: row.late || "",
    is_online: row.is_online || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/attendance/1/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedRow = await response.json();
        onSave(updatedRow); // Update the data in the parent component
        onClose(); // Close the modal
      } else {
        console.error("Error updating row:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mb-6">
        <h2 className="text-xl font-semibold mb-4">Edit Attendance</h2>
        <div className="space-y-2">
          {Object.keys(formData).map((key) => {
            if (key === "id" || key === "desk_employee_id") {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    readOnly
                    className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                  />
                </div>
              );
            }
            if (key === "is_online") {
              return (
                <div key={key}>
                  <label className="flex  space-x-2 text-start">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                    />
                    <span>{key}</span>
                  </label>
                </div>
              );
            }
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-start">{key}</label>
                <input
                  type={
                    key.includes("time") || key.includes("date")
                      ? "datetime-local"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRow;
