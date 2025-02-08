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
        placeholder="Search for a program..."
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
      <div className="flex flex-wrap gap-2 mb-6 mt-8">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterCourse.length === 0 ? ( 
            <p> No courses found for &quot;{searchCourse}&quot;.</p>
          ) : (
            filterCourse.map((course) => (
              <li
                key={course.courseid}
                className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Wrap the card content with Link */}
                <Link href={`/course/${course.coursename.replace(/ /g, "-")}`}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.coursename}
                  </h2>
                  <div className="flex flex-col gap-6">
                    <p className="text-gray-600">{course.description}</p>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
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
