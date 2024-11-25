import React, { useState, useEffect } from "react";
 import CreateEmployee from "./employee/CreateEmployee";
 import EditData from "./employee/EditData";
 import DeleteData from "./employee/DeleteData";

 const Employee = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const rowsPerPage = 10; // Number of rows to show per page
   const token = localStorage.getItem("token");
   const [showCreateModal, setShowCreateModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [currentEmployee, setCurrentEmployee] = useState(null);
   const fetchEmployees = async () => {
     try {
       const response = await fetch("http://localhost:3333/api/employees/1/", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       const result = await response.json();
       setData(result);
     } catch (error) {
       console.error("Error fetching data:", error);
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     fetchEmployees();
   }, []);

   // Pagination logic
   const lastRowIndex = currentPage * rowsPerPage;
   const firstRowIndex = lastRowIndex - rowsPerPage;
   const currentData = data.slice(firstRowIndex, lastRowIndex);

   const handleNextPage = () => {
     if (currentPage < 5) setCurrentPage(currentPage + 1);
   };

   const handlePreviousPage = () => {
     if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const columns = [
     [
       "desk_employee_id",
       "name",
       "email",
       "group_id",
       "group_name",
       "profile_url",
       "Action"
     ],
     ["is_online", "arrived", "left", "late", "online_time"],
     [
       "offline_time",
       "desktime_time",
       "at_work_time",
       "after_work_time",
       "before_work_time",
     ],
     [
       "productive_time",
       "productivity",
       "efficiency",
       "work_starts",
       "work_ends",
     ],
     ["created_at", "updated_at", "isDeleted", "user_id", "password"],
   ];

   if (loading) {
     return <div className="text-center text-lg font-bold">Loading...</div>;
   }
   const handleCreateEmployee = (newEmployee) => {
     setData((prevData) => [...prevData, newEmployee]);
   };
   const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowEditModal(true);
  };
  const handleUpdateEmployee = (updatedEmployee) => {
    setData((prevData) =>
      prevData.map((employee) =>
        employee.desk_employee_id === updatedEmployee.desk_employee_id
          ? updatedEmployee
          : employee
      )
    );
  };
  const handleDeleteEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/employees/${currentEmployee.desk_employee_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setData((prevData) =>
          prevData.filter(
            (employee) => employee.desk_employee_id !== currentEmployee.desk_employee_id
          )
        );
        setShowDeleteModal(false);
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

   return (
     <div className="p-4">
       <h1 className="text-2xl font-semibold mb-4">Employee Details</h1>
       <button
           onClick={() => setShowCreateModal(true)}
           className="px-4 py-2 bg-gray-800 text-white rounded text-left"
         >
           Create
         </button>
       <div className="overflow-x-auto">
         <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left text-gray-700">
           <thead className="bg-gray-800 text-xs text-white uppercase">
             <tr>
               {columns[currentPage - 1].map((col) => (
                 <th key={col} className="border border-gray-300 px-4 py-2">
                   {col.replace("_", " ")}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {currentData.map((employee, index) => (
               <tr
                 key={index}
                 className="bg-white hover:bg-gray-100 border border-gray-300"
               >
                 {columns[currentPage - 1].map((col) => (
                   <td key={col} className="px-4 py-2">
                     {employee[col]}
                   </td>
                 ))}
                 <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="px-4 py-2 bg-gray-800 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee)}
                    className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
               </tr>
               
             ))}
           </tbody>
         </table>
       </div>

       {/* Pagination Controls */}
       <div className="flex justify-between mt-4">
         <button
           onClick={handlePreviousPage}
           disabled={currentPage === 1}
           className={`px-4 py-2 bg-gray-800 text-white rounded ${
             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
           }`}
         >
           Previous
         </button>
         <span className="font-semibold text-gray-700">Page {currentPage}</span>
         <button
           onClick={handleNextPage}
           disabled={currentPage === columns.length}
           className={`px-4 py-2 bg-gray-800 text-white rounded ${
             currentPage === columns.length ? "opacity-50 cursor-not-allowed" : ""
           }`}
         >
           Next
         </button>
       </div>
       {showCreateModal && (
         <CreateEmployee
           onClose={() => setShowCreateModal(false)}
           onCreate={handleCreateEmployee}
         />
       )}

      {showEditModal && currentEmployee && (
        <EditData
          employee={currentEmployee}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateEmployee}
        />
      )}
      {showDeleteModal && currentEmployee && (
        <DeleteData
          employee={currentEmployee}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteConfirmation}
        />
      )}
     </div>
   );
 };
 export default Employee;

