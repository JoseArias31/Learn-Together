/* eslint-disable react/prop-types */
"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";



export const SearchProgram = () => {
  const [programname, setProgramname] = useState([]);
  const [searchProgram, setSearchProgram] = useState("");
  const [selectProgram, setSelectProgram] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modulesData, setModulesData] = useState([]);
  const programCardRef = useRef(null);
 
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const toggleModuleVisibility = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

 
  
  useEffect(() => {
    const fetchData = async () => {
      //Programs fetch from Supabase
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

      //Courses fetch from Supabase

      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            "courseid, coursename, programid, description, duration, objectives, prerequisites"
          )
          .order("courseid", { ascending: true });

        if (error) throw error;
        setCourses(data || []); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }

// Modules fetch from Supabase

try {
  const { data, error } = await supabase
    .from("modules")
    .select(
      "moduleid, modulename, description, duration, courseid"
    )
    .order("moduleid", { ascending: true });
     if (error) throw error;
    setModulesData(data || []); // Update state with fetched data
  } catch (error) {
    console.error("Error fetching modules:", error);  
  } finally {
    setLoading(false); // Set loading to false after fetch
  }



      
    };

    fetchData();
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

  const handleClick = (program) => {
    setSelectedProgram(program);

    if (programCardRef.current) {
      programCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }};



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
      <div ref={programCardRef} className="flex flex-wrap gap-4 mb-8 mt-8 justify-center grid gap-4 grid-cols-1 sm:grid-cols-2">
        <ul>
          {filterPrograms.length === 0 ? (
            <p className="text-gray-600 text-center">
              No programs found for &quot;{searchProgram}&quot;.
            </p>
          ) : (
            filterPrograms.map((program) => (
              <li
                className="flex items-center justify-between mt-2 p-4 border rounded-lg -sm shadowhover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
                key={program.programid}
                onClick={() => handleClick(program)}
              >
                {/* Card Content */}
                <div className="flex-grow ">
                  <h2 className="text-base font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    {program.programname}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {program.description}
                  </p>
                </div>
                <div className="flex flex-col  items-center gap-2">
               
               
                <Link
                  href={`/programs/${program.programname.replace(/ /g, "-")}`}
                >
                  {/* Enroll Button */}
                  <button className="ml-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                    Start 
                  </button>
                </Link>
                <Link
                  href={`/programs/${program.programname.replace(/ /g, "-")}`}
                >
                  {/* Enroll Button */}
                  <button className="ml-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                    Details 
                  </button>
                </Link>
                </div>
              </li>
            ))
          )}
        </ul>
        {/* Display Related Text */}
        <div className="mt-2 p-4 border rounded-lg shadow-sm bg-white">
          {selectedProgram ? ( // Verifica si hay un programa seleccionado
            <div>
              {/* Detalles del programa seleccionado */}
              <h2 className="text-lg w-full text-center  font-semibold text-gray-900 relative inline-block pb-2">
                {selectedProgram.programname}
                {/* Línea inferior gris */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></span>
              </h2>
              <h2 className="text-base text-start font-bold mt-4">
                Course Contents
              </h2>

              <div>
      {courses
        .filter((course) => course.programid === selectedProgram.programid)
        .map((course) => (
          <div key={course.courseid} className="bg-gray-100 p-2 mt-2 rounded">
            <div className="flex justify-between items-center">
              <div>
                <Link href={`/courses/${encodeURIComponent(course.coursename)}`} className="w-2/3">
                  <h3 className="text-xs font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    {course.coursename}
                  </h3>
                </Link>
                <p className="text-xs text-gray-600">{course.duration}</p>
                <button
                  onClick={() => toggleModuleVisibility(course.courseid)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {expandedCourseId === course.courseid ? <img src="/ad.png" className="w-4 h-4"/> : <img src="/ar.png" className="w-4 h-4"/>}
                </button>
              </div>
              <div className="flex gap-2 sm:gap-1 items-center">
                <Link href={`/courses/${encodeURIComponent(course.coursename)}`}>
                  <button className="px-2 py-1 text-[9px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    Start
                  </button>
                </Link>
                
              </div>
            </div>

            {/* Módulos relacionados */}
            {expandedCourseId === course.courseid && (
              <div className="p-2 mt-2 bg-gray-50 rounded">
                <h2 className="text-xs font-bold text-gray-800 text-center">Modules</h2>
                {modulesData
                  .filter((module) => module.courseid === course.courseid)
                  .map((module) => (
                    <div
                      key={module.moduleid}
                      className="bg-white p-2 mt-2 rounded shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div className="text-start sm:w-full md:w-[25%]">
                        <h3 className="text-sm font-bold text-gray-800">{module.modulename}</h3>
                        <p className="text-xs text-gray-600">{module.duration}</p>
                      </div>
                      <div className="text-start sm:w-full md:w-[65%]">
                        <p className="text-xs text-gray-700">{module.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>


              {/* Mensaje si no hay cursos relacionados */}
              {courses.filter(
                (course) => course.programid === selectedProgram.programid
              ).length === 0 && (
                <p className="text-gray-600 mt-4">
                  No courses available for this program.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">
              Click on a program to see Courses Available.
            </p>
          )}
        </div>
      </div>

      {/* Display Count of Filtered Programs */}
      <p>
        Showing {filterPrograms.length} of {programname.length}
      </p>
    </div>
  );
};
