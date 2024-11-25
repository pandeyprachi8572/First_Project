import React, { useEffect, useState } from "react";
import CreateRow from "./attendancepage/CreateRow";
import DeleteRow from "./attendancepage/DeleteRow";
import EditRow from "./attendancepage/EditRow";
const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [fieldPage, setFieldPage] = useState(0);
  const fieldPages = [
    [
      "id",
      "desk_employee_id",
      "date",
      "arrived",
      "left",
      "online_time",
      "offline_time",
    ],
    ["desktime_time", "at_work_time"],
    ["after_work_time", "before_work_time", "productive_time", "productivity"],
    [
      "efficiency",
      "work_starts",
      "work_ends",
      "late",
      "is_online",
      "created_at",
      "updated_at",
    ],
  ];
  // Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/attendance");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // const totalPages = Math.ceil(data.length / rowsPerPage);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-gray-800">Attendance </h1>
      <div className="mb-4 flex justify-between">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={() => setIsCreateOpen(true)}
        >
          Create
        </button>
        <div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-gray-700">
          <thead className="bg-gray-800 text-xs text-white uppercase text-gray-700">
            <tr>
              {fieldPages[fieldPage].map((field) => (
                <th
                  key={field}
                  className="border border-gray-300 px-4 py-2 capitalize"
                >
                  {field.replace("_", " ")}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {fieldPages[fieldPage].map((field) => (
                  <td key={field} className="border border-gray-300 px-4 py-2">
                    {row[field] || "N/A"}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded mr-2"
                    onClick={() => setEditData(row) || setIsEditOpen(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => setDeleteId(row.id) || setIsDeleteOpen(true)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-800 text-white px-5 py-1 mr-5 rounded"
          onClick={() => setFieldPage((prev) => Math.max(prev - 1, 0))}
          disabled={fieldPage === 0}
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Field Page {fieldPage + 1} of {fieldPages.length}
        </span>
        <button
          className="bg-gray-800 text-white px-5 py-1  mr-1 rounded"
          onClick={() =>
            setFieldPage((prev) => Math.min(prev + 1, fieldPages.length - 1))
          }
          disabled={fieldPage === fieldPages.length - 1}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {isCreateOpen && (
        <CreateRow
          onClose={() => setIsCreateOpen(false)}
          onSave={(newRow) => setData((prev) => [...prev, newRow])}
        />
      )}
      {isEditOpen && (
        <EditRow
          row={editData}
          onClose={() => setIsEditOpen(false)}
          onSave={(updatedRow) =>
            setData((prev) =>
              prev.map((item) =>
                item.id === updatedRow.id ? updatedRow : item
              )
            )
          }
        />
      )}
      {isDeleteOpen && (
        <DeleteRow
          id={deleteId}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={(id) =>
            setData((prev) => prev.filter((item) => item.id !== id))
          }
        />
      )}
    </div>
  );
};
export default Attendance;

