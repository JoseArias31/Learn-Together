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
    <div className="courses-grid grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 gap-y-4 md:gap-6 p-2 mx-auto ">

      {loading ? (
        <p className="text-center text-white">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : courses.length > 0 ? (
        courses.slice(0, 8).map((course) => (
          <Link
            className="course-card w-full max-w-[250px] xxl:h-[140px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[280px] mx-auto p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-neon lg:mr"
            style={{
              background:
                "linear-gradient(145deg,rgb(0, 0, 0),rgb(25, 38, 63))",
              backdropFilter: "blur(10px)", // Glass morphism effect
              border: "1px solid rgb(25, 38, 63)", // Neon green border
              borderRadius: "30px 10px 30px 10px", // Asymmetrical rounded corners
              boxShadow: "0 4px 30px rgb(25, 38, 63)", // Soft neon shadow
              fontFamily: "monospace", // Monospace font
              padding: "0.7rem",
              paddingTop: "1.5rem"
              
            }}
            key={course.courseid}
            href={`/courses/${course.coursename.replace(
              / /g,
              "-"
            )}`}
          >
            <h3 className="text-green-400 text-2xl font-bold mb-4 hover:text-green-300 transition-colors duration-300">
              {course.coursename}
            </h3>
            <p className="!text-white mb-6 text-start opacity-80 hover:opacity-100 transition-opacity duration-300">
              {course.description}
            </p>
            <p className="text-white mb-6 text-start opacity-80 hover:opacity-100 transition-opacity duration-300">
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
