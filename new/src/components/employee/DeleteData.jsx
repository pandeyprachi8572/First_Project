import React from "react";

const DeleteData = ({ employee, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-red-500">Are you sure?</h2>
        <p className="mb-4">Do you really want to delete employee <strong>{employee.name}</strong> with ID: <strong>{employee.desk_employee_id}</strong>?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteData;
