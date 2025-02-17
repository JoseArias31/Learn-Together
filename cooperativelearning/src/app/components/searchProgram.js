/* eslint-disable react/prop-types */
"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
export const SearchProgram = () => {
  const [programname, setProgramname] = useState([]);
  const [searchProgram, setSearchProgram] = useState("");
  const [selectProgram, setSelectProgram] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from("programs") // Replace with your table name
          .select("programid, programname, description, duration");

        if (error) throw error;

        setProgramname(data || []); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchPrograms();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Create a list of unique program names for the dropdown
  const ChoosingPrograms = [
    "All",
    ...new Set(programname.map((program) => program.programname)),
  ];

  // Filter programs based on search and selection
  const filterPrograms = programname.filter(
    (program) =>
      program.programname.toLowerCase().includes(searchProgram.toLowerCase()) &&
      (selectProgram === "All" || program.programname === selectProgram)
  );

  if (loading) {
    return <p>Loading programs...</p>;
  }

  return (
    <div className="search-program">
      {/* Search Input */}

      <input
        type="text"
        placeholder="Search for a program..."
        className="search-program-input h-10 p-2 border rounded mr-4"
        onChange={(e) => setSearchProgram(e.target.value)}
      />

      {/* Dropdown for Program Selection */}
      <select
        value={selectProgram}
        onChange={(e) => setSelectProgram(e.target.value)}
        className="mt-4 p-2  border rounded h-10 "
      >
        {ChoosingPrograms.map((program, index) => (
          <option key={index} value={program}>
            {program}
          </option>
        ))}
      </select>

      {/* Display Filtered Programs */}
      <div className="flex flex-wrap gap-4 mb-8 mt-8 justify-center grid gap-4 grid-cols-1 sm:grid-cols-2">
  <ul >
    {filterPrograms.length === 0 ? (
      <p className="text-gray-600 text-center">No programs found for &quot;{searchProgram}&quot;.</p>
    ) : (
      filterPrograms.map((program) => (
        <Link key={program.programid} href={`/programs/${program.programname.replace(/ /g, "-")}`}>
          <div className="flex items-center justify-between mt-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            {/* Card Content */}
            <div className="flex-grow ">
              <h2 className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
                {program.programname}
              </h2>
              <p className="text-xs text-gray-600 mt-1">{program.description}</p>
            </div>

            {/* Enroll Button */}
            <button className="ml-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
              Enroll
            </button>
          </div>
        </Link>
      ))
    )}
  </ul>
</div>

      

      {/* Display Count of Filtered Programs */}
      <p>
        Showing {filterPrograms.length} of {programname.length}
      </p>
    </div>
  );
};
