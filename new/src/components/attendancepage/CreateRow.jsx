import React, { useState } from "react";
const CreateRow = ({ onClose, onSave }) => {
  const [newRow, setNewRow] = useState({
    desk_employee_id: "",
    date: "",
    arrived: "",
    left: "",
    online_time: "",
    offline_time: "",
    desktime_time: "",
    at_work_time: "",
    after_work_time: "",
    before_work_time: "",
    productive_time: "",
    productivity: "",
    efficiency: "",
    work_starts: "",
    work_ends: "",
    late: "",
    is_online: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });
      if (response.ok) {
        const createdData = await response.json();
        onSave(createdData);
        onClose();
      } else {
        console.error("Failed to create row");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" inset-0  bg-opacity-50 mb-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Row</h2>
        <form className="space-y-3">
          {Object.keys(newRow).map((key) => (
            <div key={key}>
              <label className="block  font-medium text-gray-700 capitalize text-start">
                {key.replace("_", " ")}
              </label>
              <input
                type="text"
                value={newRow[key]}
                onChange={(e) =>
                  setNewRow((prev) => ({ ...prev, [key]: e.target.value }))
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
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRow;
