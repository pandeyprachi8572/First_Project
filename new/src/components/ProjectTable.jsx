import React, { useState, useEffect } from "react";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import DeleteProject from "./pages/DeleteProject";
import Search from "./pages/Search";
const ProjectTable = () => {
const [projects, setProjects] = useState([]);
const [filteredProjects, setFilteredProjects] = useState([]);
const token = localStorage.getItem("token");
useEffect(() => {
const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:3333/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data);
          setFilteredProjects(data); // Set filtered projects initially
        } else {
          console.error("Data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
}, [token]);
return (
  <div>
    <div className="flex justify-between mb-2">
        <CreateProject setProjects={setProjects} />
        <Search projects={projects} setFilteredProjects={setFilteredProjects} />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-500 text-white">
            <th className="py-3 px-3 text-left text-lg font-semibold">
              Project ID
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold">
              Project Name
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold">
              Budget
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold">
              Current Cost
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold">
              Is Critical
            </th>
            <th className="py-6 px-6 text-left text-lg font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.project_id} className="hover:bg-gray-100">
                <td className="py-3 px-3 text-sm text-gray-800">
                  {project.project_id}
                </td>
                <td className="py-3 px-3 text-sm text-gray-800">
                  {project.project_name}
                </td>
                <td className="py-3 px-3 text-sm text-gray-800">
                  {project.budget}
                </td>
                <td className="py-3 px-3 text-sm text-gray-800">
                  {project.current_cost}
                </td>
                <td className="py-3 px-3 text-sm text-gray-800">
                  {project.is_critical ? "Yes" : "No"}
                </td>
                <td className="py-6 ml-6 px-1 text-sm text-gray-800 action">
                  <EditProject project={project} setProjects={setProjects} />
                  <DeleteProject
                    projectId={project.project_id}
                    setProjects={setProjects}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-3 text-gray-600">
                No projects available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectTable;







/*import React, { useState, useEffect } from "react";
const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <table className="min-w-full  bg-white border border-gray-300 rounded-lg ">
        <thead>
          <tr className="bg-gray-300 border-gray-300 text-white-800">
            <th className="py-3 px-3 text-left text-lg font-semibold text-white-600">
              Project ID
            </th>
            <th className="py-3 px-3 text-left text-lg text-white font-semibold text-gray-600">
              Project Name
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold text-gray-600">
              Budget
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold text-gray-600">
              Current Cost
            </th>
            <th className="py-3 px-3 text-left text-lg font-semibold text-gray-600">
              Is Critical
            </th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <tr
                key={project.project_id}
                className="hover:bg-gray-100 border-black-200"
              >
                <td className="py-3 px-6 text-sm text-gray-800">
                  {project.project_id}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {project.project_name}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {project.budget}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {project.current_cost}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {project.is_critical ? "Yes" : "No"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-3 text-gray-600">
                No projects available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectTable;*/
