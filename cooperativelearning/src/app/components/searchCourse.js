'use client'

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export const SearchCourse = () => {
  const [coursename, setCourse] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");
  const [selectCourse, setSelectCourse] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase.from("courses").select(
          "courseid, coursename, description, duration"
        );

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
  ]

  const filterCourse = coursename.filter(
(course)=> course.coursename.toLowerCase().includes(searchCourse.toLowerCase()) &&
(selectCourse === "All" || course.coursename === selectCourse)
  )

  if(loading){
    return <p>Loading Courses...</p>
  }

  if (coursename.length === 0) {
    return <p>No courses found.</p>;
  }



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
      <div className="flex flex-wrap gap-4 mb-8 mt-8 justify-center grid gap-4 grid-cols-1 sm:grid-cols-1 w-1/3">
        <ul >
          {filterCourse.length === 0 ? ( 
            <p className="text-gray-600 text-center"> No courses found for &quot;{searchCourse}&quot;.</p>
          ) : (
            filterCourse.map((course) => (
              <li
              className="flex items-center justify-between mt-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
              key={course.courseid}
              // onClick={() => handleClick(program)}
            >
              {/* Card Content */}
              <div className="flex-grow ">
                <h2 className="text-base font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  {course.coursename}
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  {course.description}
                </p>
              </div>
              <Link
                href={`/courses/${encodeURIComponent(course.coursename.replace(/ /g, "-"))}`}
              >
                {/* Enroll Button */}
                <button className="ml-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  Add
                </button>
              </Link>
            </li>
            ))
          )}
        </ul>
      </div>
  
      {/* Display Count of Filtered Programs */}
      <p>
        Showing {filterCourse.length} of {coursename.length}
      </p>
    </div>
  );
};
