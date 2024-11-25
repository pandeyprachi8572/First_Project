// import React, { useEffect, useState } from "react";
// import EditEmployee from "./Hourlypage/EditEmployee";
// import CreateEmployee from "./Hourlypage/CreateEmployee";
// //import CreateEmployee from "./CreateEmployee";
// //import EditEmployee from "./EditEmployee";
// const HourlyRate = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreatePopup, setShowCreatePopup] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3333/api/employee-hourly-rate"
//       );
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchEmployees();
//   }, []);
//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:3333/api/employee-hourly-rate/1/${id}`, {
//         method: "DELETE",
//       });
//       setData(data.filter((employee) => employee.employee_id !== id));
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };
//   if (loading) {
//     return <div className="text-center text-lg font-bold">Loading...</div>;
//   }
//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-4xl font-semibold">Hourly Rate</h1>
//         <button
//           className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
//           onClick={() => setShowCreatePopup(true)}
//         >
//           Create Employee
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-800 text-sm text-left text-gray-500">
//           <thead className="bg-gray-800 text-xs text-white uppercase text-gray-700">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Employee ID</th>
//               <th className="border border-gray-300 px-4 py-2">
//                 Employee Name
//               </th>
//               <th className="border border-gray-300 px-4 py-2">Bill Rate</th>
//               <th className="border border-gray-300 px-4 py-2">Pay Rate</th>
//               <th className=" border border-gray-300 px-4 py-2"> created_at</th>
//               <th className=" border border-gray-300 px-4 py-2">updated_at</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((employee) => (
//               <tr
//                 key={employee.employee_id}
//                 className="bg-white hover:bg-gray-50"
//               >
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.employee_id}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.employee_name}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.bill_rate}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.pay_rate}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.created_at}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {employee.updated_at}
//                 </td>

//                 <td className="border border-gray-300 px-4 py-2 space-x-2">
//                   <button
//                     className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-green-600"
//                     onClick={() => setEditingEmployee(employee)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(employee.employee_id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showCreatePopup && (
//         <CreateEmployee
//           onClose={() => setShowCreatePopup(false)}
//           onEmployeeCreated={fetchEmployees}
//         />
//       )}
//       {editingEmployee && (
//         <EditEmployee
//           employee={editingEmployee}
//           onClose={() => setEditingEmployee(null)}
//           onEmployeeUpdated={fetchEmployees}
//         />
//       )}
//     </div>
//   );
// };
// export default HourlyRate;
import React, { useEffect, useState } from "react";
import EditEmployee from "./Hourlypage/EditEmployee";
import CreateEmployee from "./Hourlypage/CreateEmployee";

const HourlyRate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:3333/api/employee-hourly-rate"
      );
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

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await fetch(
        `http://localhost:3333/api/employee-hourly-rate/1/${employeeToDelete}`,
        {
          method: "DELETE",
        }
      );
      setData(
        data.filter((employee) => employee.employee_id !== employeeToDelete)
      );
      setEmployeeToDelete(null); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">Hourly Rate</h1>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => setShowCreatePopup(true)}
        >
          Create Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800 text-sm text-left text-gray-500">
          <thead className="bg-gray-800 text-xs text-white uppercase text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">
                Employee Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Bill Rate</th>
              <th className="border border-gray-300 px-4 py-2">Pay Rate</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr
                key={employee.employee_id}
                className="bg-white hover:bg-gray-50"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {employee.employee_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.employee_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.bill_rate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.pay_rate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.created_at}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.updated_at}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => setEditingEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => setEmployeeToDelete(employee.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreatePopup && (
        <CreateEmployee
          onClose={() => setShowCreatePopup(false)}
          onEmployeeCreated={fetchEmployees}
        />
      )}
      {editingEmployee && (
        <EditEmployee
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onEmployeeUpdated={fetchEmployees}
        />
      )}
      {employeeToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this employee?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setEmployeeToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyRate;
