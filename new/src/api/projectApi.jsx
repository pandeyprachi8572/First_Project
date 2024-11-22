import axios from "axios";
const API_BASE_URL = "http://localhost:3333/api/projects"; 
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
