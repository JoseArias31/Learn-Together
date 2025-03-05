import React, { useState, useEffect } from "react";
import "./styles/coursecards.css";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase.from("courses").select("*");
        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className=" grid grid-cols-1 gap-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-y-6 md:gap-4 px-4 sm:px-10 mr-10 ml-10">

      {loading ? (
        <p className="text-center text-white">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : courses.length > 0 ? (
        courses.slice(0, 5).map((course) => (
          <Link
            className="flex flex-col  justify-between program-card  w-full max-w-[300px] xxl:h-[140px] mx-auto p-2 transition-all duration-300 hover:scale-105 hover:shadow-neon text-start"
            style={{
              background:
                "linear-gradient(145deg,rgb(0, 0, 0),rgb(25, 38, 63))",
              backdropFilter: "blur(10px)", // Glass morphism effect
              border: "1px solid rgb(25, 38, 63)", // Neon green border
              borderRadius: "30px 10px 30px 10px", // Asymmetrical rounded corners
              boxShadow: "0 4px 30px rgb(25, 38, 63)", // Soft neon shadow
              fontFamily: "monospace", // Monospace font
              padding: "0.7rem",
              paddingTop: "1rem",
              paddingLeft: "1rem"
              
            }}
            key={course.courseid}
            href={`/courses/${course.coursename.replace(
              / /g,
              "-"
            )}`}
          >
            <h3 className="text-green-400 text-2xl lg:text-xl font-bold  hover:text-green-300 transition-colors duration-300 truncate">
              {course.coursename}
            </h3>
            <p className="!text-white opacity-80 hover:opacity-100 transition-opacity duration-300 text-sm lg:text-xs overflow-hidden line-clamp-3">
              {course.description}
            </p>
            <p className="text-white opacity-80 hover:opacity-100 transition-opacity duration-300 text-xs lg:text-xs">
              {course.duration}
            </p>
          </Link>
        ))
      ) : (
        <p className="text-center text-white">No courses available.</p>
      )}
    </div>
  );
};

export default Courses;
