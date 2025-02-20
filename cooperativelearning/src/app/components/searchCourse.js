"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
// import { s } from "framer-motion/dist/types.d-CdW9auKD";

export const SearchCourse = () => {
  const [coursename, setCourse] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");
  const [selectCourse, setSelectCourse] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("courseid, coursename, description, duration");

        if (error) throw error;
        setCourse(data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once on mount

  const choiseCourses = [
    "All",
    ...new Set(coursename.map((course) => course.coursename)),
  ];

  const filterCourse = coursename.filter(
    (course) =>
      course.coursename.toLowerCase().includes(searchCourse.toLowerCase()) &&
      (selectCourse === "All" || course.coursename === selectCourse)
  );

  if (loading) {
    return <p>Loading Courses...</p>;
  }

  if (coursename.length === 0) {
    return <p>No courses found.</p>;
  }

  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="search-program">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a Course..."
        className="search-program-input h-10 p-2 border rounded mr-4"
        onChange={(e) => setSearchCourse(e.target.value)}
      />

      {/* Dropdown for Program Selection */}
      <select
        value={selectCourse}
        onChange={(e) => setSelectCourse(e.target.value)}
        className="mt-4 p-2 border rounded h-10"
      >
        {choiseCourses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      {/* Display Filtered Programs */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8 mt-8 w-full">
        {/* Contenedor de las cards (w-1/3 en pantallas grandes) */}
        <div className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px] overflow-y-auto w-full lg:w-1/3">
          <div className="grid gap-4 grid-cols-1">
            {filterCourse.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No courses found for &quot;{searchCourse}&quot;.
              </p>
            ) : (
              filterCourse.slice(0, 10).map((course) => (
                <li
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
                  key={course.courseid}
                  onClick={() => handleClick(course)}
                >
                  {/* Card Content */}
                  <div className="flex-grow">
                    <h2 className="text-base font-bold text-gray-800 hover:text-blue-600 transition-colors">
                      {course.coursename}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">
                      {course.description}
                    </p>
                  </div>
                  {/* Botón responsivo */}
                  <Link
                    href={`/courses/${encodeURIComponent(
                      course.coursename.replace(/ /g, "-")
                    )}`}
                  >
                    <button className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      Add
                    </button>
                  </Link>
                </li>
              ))
            )}
          </div>
        </div>

        {/* Contenedor del contenido del curso (w-2/3 en pantallas grandes) */}
        {selectedCourse ? (
          <div className="w-full lg:w-2/3">
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCourse.coursename}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {selectedCourse.description}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Duration: {selectedCourse.duration}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-2/3">
            {/* Mensaje cuando no hay curso seleccionado */}
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                Course Details
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Select a course to view its details.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Display Count of Filtered Programs */}
      <p className="text-sm text-gray-600 mt-4">
        Showing {filterCourse.length} of {coursename.length} courses
      </p>
    </div>
  );
};
