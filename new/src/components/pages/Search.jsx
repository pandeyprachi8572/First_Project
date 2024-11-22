import React, { useState } from "react";

const Search = ({ setProjects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/projects?search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Search API response is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
