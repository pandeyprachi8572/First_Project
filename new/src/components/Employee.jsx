import React, { useState, useEffect } from "react";

const Employee = () => {
  const [data, setData] = useState([]); // Employee data
  const [page, setPage] = useState(1); // Current page
  const [fields, setFields] = useState([]); // Fields for the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showPopup, setShowPopup] = useState(false); // Show popup state
  const [popupData, setPopupData] = useState({}); // Data for create/edit popup
  const [isEditMode, setIsEditMode] = useState(false); // To distinguish between Create and Edit

  const token = localStorage.getItem("token");

  // Define fields for each page
  const fieldPages = [
    [
      "desk_employee_id",
      "name",
      "email",
      "group_id",
      "group_name",
      "profile_url",
    ],
    ["is_online", "arrived", "left", "late", "online_time"],
    ["offline_time", "desktime_time", "at_work_time", "after_work_time"],
    [
      "before_work_time",
      "productive_time",
      "productivity",
      "efficiency",
      "work_starts",
      "work_ends",
      "created_at",
      "updated_at",
      "isDeleted",
      "user_id",
      "password",
    ],
  ];

  // Fetch data when page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/api/employees/1/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.data || []); // Set fetched data
      setFields(fieldPages[page - 1]); // Set current page fields
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setPopupData({});
    setIsEditMode(false);
    setShowPopup(true);
  };

  const handleEdit = (rowData) => {
    setPopupData(rowData);
    setIsEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirm) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/employees/6/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        // Refetch data after deletion
        fetchData();
      } catch (err) {
        console.error("Failed to delete record:", err);
      }
    }
  };
  const handlePopupSubmit = async () => {
    try {
      const url = isEditMode
        ? `http://localhost:3333/api/employees/6/${popupData.desk_employee_id}`
        : "http://localhost:3333/api/employees";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(popupData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      // Close popup and refetch data
      setShowPopup(false);
      fetchData();
    } catch (err) {
      console.error("Failed to submit data:", err);
    }
  };
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employee Table</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Create
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="min-w-full bg-gray-800 text-white border uppercase border-gray-200 shadow-sm">
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field} className="py-2 px-4 border-b">
                  {field}
                </th>
              ))}
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {fields.map((field) => (
                  <td key={field} className="py-2 px-4 border-b">
                    {row[field] || "N/A"}
                  </td>
                ))}
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(row)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.desk_employee_id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          disabled={page === fieldPages.length}
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, fieldPages.length))
          }
        >
          Next
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Employee" : "Create Employee"}
            </h2>
            <form>
              {[
                "name",
                "email",
                "group_id",
                "group_name",
                "profile_url",
                "user_id",
                "password",
              ].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block mb-1 capitalize">{field}</label>
                  <input
                    type="text"
                    value={popupData[field] || ""}
                    onChange={(e) =>
                      setPopupData({ ...popupData, [field]: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePopupSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Employee;
