import React, { useEffect, useState } from "react";
const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto  text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Desk Employee ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Arrived</th>
            <th className="px-4 py-2">Left</th>
            <th className="px-4 py-2">Online Time</th>
            <th className="px-4 py-2">Offline Time</th>
            <th className="px-4 py-2">Desktime Time</th>
            <th className="px-4 py-2">At Work Time</th>
            <th className="px-4 py-2">After Work Time</th>
            <th className="px-4 py-2">Before Work Time</th>
            <th className="px-4 py-2">Productive Time</th>
            <th className="px-4 py-2">Productivity</th>
            <th className="px-4 py-2">Efficiency</th>
            <th className="px-4 py-2">Work Starts</th>
            <th className="px-4 py-2">Work Ends</th>
            <th className="px-4 py-2">Late</th>
            <th className="px-4 py-2">Is Online</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.desk_employee_id}</td>
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2">{item.arrived}</td>
              <td className="px-4 py-2">{item.left}</td>
              <td className="px-4 py-2">{item.online_time}</td>
              <td className="px-4 py-2">{item.offline_time}</td>
              <td className="px-4 py-2">{item.desktime_time}</td>
              <td className="px-4 py-2">{item.at_work_time}</td>
              <td className="px-4 py-2">{item.after_work_time}</td>
              <td className="px-4 py-2">{item.before_work_time}</td>
              <td className="px-4 py-2">{item.productive_time}</td>
              <td className="px-4 py-2">{item.productivity}</td>
              <td className="px-4 py-2">{item.efficiency}</td>
              <td className="px-4 py-2">{item.work_starts}</td>
              <td className="px-4 py-2">{item.work_ends}</td>
              <td className="px-4 py-2">{item.late ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{item.is_online ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{item.created_at}</td>
              <td className="px-4 py-2">{item.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
