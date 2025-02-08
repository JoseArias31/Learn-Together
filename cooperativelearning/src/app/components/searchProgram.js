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
      <div className="flex flex-wrap gap-2 mb-6 mt-8">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterPrograms.length === 0 ? (<p>No programs found for &quot;{searchProgram}&quot;.</p>
          ) : (
          filterPrograms.map((program) => (
            <li
              key={program.programid}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Wrap the card content with Link */}
              <Link
                href={`/programs/${program.programname.replace(/ /g, "-")}`}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {program.programname}
                </h2>
                <div className="flex flex-col gap-6">
                  <p className="text-gray-600">{program.description}</p>
                  <p className="text-gray-600">{program.duration}</p>
                </div>
              </Link>
            </li>
          )))}
        </ul>
      </div>

      {/* Display Count of Filtered Programs */}
      <p>
        Showing {filterPrograms.length} of {programname.length}
      </p>
    </div>
  );
};
