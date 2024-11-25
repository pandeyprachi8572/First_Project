// import React, { useState } from "react";
// const Search = ({ setProjects }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const token = localStorage.getItem("token");
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3333/api/projects/search${searchQuery}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setProjects(data);
//       } else {
//         console.error("Search API response is not an array", data);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <input
//         type="text"
//         placeholder="Search projects..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="border px-3 py-2 rounded w-full"
//       />
//       <button
//         onClick={handleSearch}
//         className="bg-gray-800 text-white px-4 py-2 rounded"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default Search;

import React, { useState } from "react";

const Search = ({ setProjects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.error("Search query cannot be empty");
      return; // Avoid empty search queries
    }
    if (!token) {
      console.error("Token not found");
      return; // Ensure the token is available
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3333/api/projects/search?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data.projects)) {
        setProjects(data.projects); // Assuming `data.projects` holds the project array
      } else {
        console.error("Search API response is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <button
        onClick={() => setSearchQuery("")}
        className="bg-gray-500 text-white px-2 py-1 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
