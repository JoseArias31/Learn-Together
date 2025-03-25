"use client";

/* eslint-disable react/prop-types */
import { supabase } from "src/app/lib/supabaseClient";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import useProtectedRoute from "src/app/auth/register/Hooks/useProtectedRoutes";
import { BookOpen, Clock, GraduationCap, BookOpenText } from "lucide-react";

export default function ProgramPage({ params }) {
  const session = useProtectedRoute();
  const [programData, setProgramData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [modulesData, setModulesData] = useState([]); // Consolidated modules state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course
  const [isEnrolled, setIsEnrolled] = useState(false);

  const unwrappedParams = use(params);

  // Access the `programname` property from the unwrapped params
  const programname = unwrappedParams.programname.replace(/-/g, " ");

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!session?.user?.id || !programData) return;

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('program_id', programData.programid);

      if (error) {
        console.error('Error checking enrollment:', error.message);
        return;
      }

      setIsEnrolled(data.length > 0);
    };

    checkEnrollment();
  }, [session, programData]);

  const enrollInProgram = async (userId) => {
    if (isEnrolled) return;

    try {
      if (!session) {
        setError('User must be logged in to enroll');
        return;
      }

      if (!programData) {
        setError('Program data not available');
        return;
      }

      const enrollments = coursesData.map(course => ({
        user_id: userId,
        program_id: programData.programid,
        course_id: course.courseid,
        enrolled_at: new Date().toISOString()
      }));

      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .insert(enrollments)
        .select();

      if (enrollmentError) throw enrollmentError;
      setIsEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in program:', error.message);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch the program by name
        const { data: programData, error: programError } = await supabase
          .from("programs")
          .select("*")
          .eq("programname", programname)
          .single(); // Assuming `programname` is unique

        if (programError) {
          throw new Error(`Error fetching program: ${programError.message}`);
        }

        if (!programData) {
          throw new Error("Program not found.");
        }

        setProgramData(programData);

        // 2. Fetch courses for the program using programData.programid
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("*")
          .eq("programid", programData.programid); // Foreign key to `programid`

        if (coursesError) {
          throw new Error(`Error fetching courses: ${coursesError.message}`);
        }

        setCoursesData(coursesData);

        // Wait for session to be available
        if (session === null) {
          // Session is still loading
          return;
        }

        if (!session) {
          setError("User must be logged in to enroll");
          return;
        }

        // 3. Fetch modules for each course
        const modulesPromises = coursesData.map(async (course) => {
          const { data: modulesData, error: modulesError } = await supabase
            .from("modules")
            .select("*")
            .eq("courseid", course.courseid); // Fetch modules for each course

          if (modulesError) {
            console.error(
              `Error fetching modules for course ${course.courseid}: ${modulesError.message}`
            );
            return []; // Return an empty array if there's an error
          }

          return modulesData; // Return modules for this course
        });

        // Wait for all module fetches to complete
        const modulesResults = await Promise.all(modulesPromises);

        // Flatten the array of arrays into a single array of modules
        const allModules = modulesResults.flat();
        setModulesData(allModules);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, [programname, session]); // Re-run effect if programname changes

  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!programData) {
    return <div>Program not found.</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-6 py-8 ">
      {session ? (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-1 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base font-semibold">
          Hi, {session.user.email.replace(/@[^@]+$/, "")}!
        </h1>
      </div>
    ) : (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
          Welcome to Learn Together!
        </h1>
      </div>
    )}

        <h1 className="text-3xl font-bold mb-6 capitalize">
          {programData.programname} Program
        </h1>
        
        <div
          className="rounded"
          style={{ backgroundColor: "#80808045", padding: "15px" }}
        >
          <h2 className="mb-2 font-bold">Program Overview</h2>
          <p className="text-gray-600 mb-4">{programData.fulldescription}</p>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
              <div className="flex items-center font-bold ">
                <BookOpen className="mr-2" />
                <span>{coursesData.length} Courses</span>
              </div>
              <div className="flex items-center font-bold">
                <Clock className="mr-2" />
                <span>{programData.duration} Program</span>
              </div>
              <div className="flex items-center font-bold">
                <GraduationCap className="mr-2" />
                <span>{programData.titlegranted}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="border border-black text-black hover:bg-gray-700 hover:text-white font-semibold mt-4 py-2 px-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Enroll Now
        </button>
        <button 
          onClick={() => enrollInProgram(session.user.id)}
          disabled={isEnrolled}
          className={`px-4 py-2 rounded ${isEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isEnrolled ? 'Enrolled' : 'Enroll in Full Program'}
        </button>
        {coursesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Primer div: w-full on small screens, w-1/3 on large screens */}
            <div
              className="col-span-1 lg:col-span-1 rounded shadow-sm hover:shadow-md transition-shadow duration-100"
              style={{
                backgroundColor: "rgb(213 213 213 / 10%)",
                padding: "15px",
              }}
            >
              <div className="rounded">
                <h2 className="font-bold">Available Courses</h2>
                <ul>
                  {coursesData.map((course) => (
                    <li
                      key={course.courseid}
                      className="p-2 hover:shadow-lg transition-shadow duration-300 rounded "
                      onClick={() => handleClick(course)}
                    >
                      <div className="flex flex-row gap-2 justify-between items-center bg-gray-100 rounded p-2">
                        {" "}
                        <div className="w-2/3 flex gap-2">
                          <BookOpenText />{" "}
                          <h2 className="text-sm font-bold cursor-pointer hover:text-blue-600">
                            {course.coursename}
                          </h2>
                        </div>
                        <h2 className="text-sm cursor-pointer hover:text-blue-600">
                          {course.duration}
                        </h2>
                      </div>
                      <p className="text-xs text-gray-600 mt-2"> {course.fulldescription}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Segundo div: w-full on small screens, w-2/3 on large screens */}
            <div
              className="col-span-1 lg:col-span-2 rounded shadow-sm hover:shadow-md transition-shadow duration-100"
              style={{
                backgroundColor: "rgb(213 213 213 / 10%)",
                padding: "15px",
              }}
            >
              {/* Contenido del segundo div */}

              {selectedCourse ? ( // Verifica si hay un programa seleccionado
                <div className="rounded">
                  {/* Detalles del programa seleccionado */}
                  <h2 className="text-lg w-full text-center  font-semibold text-gray-900 relative inline-block pb-2">
                    {selectedCourse.coursename}
                    {/* Línea inferior gris */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></span>
                  </h2>
                  <h2 className="text-base text-start font-bold mt-4">
                    Course Contents
                  </h2>

                  {/* Filtrar y mapear cursos relacionados */}
                  {modulesData
                    .filter(
                      (module) => module.courseid === selectedCourse.courseid
                    ) // Filtra los cursos
                    .map((module) => (
                     
                      <div
                        key={module.moduleid}
                        className="bg-gray-100 p-2 mt-2 rounded flex flex-col md:flex-col lg:flex-row sm:flex-row sm:items-center md:items-start md:gap-2 sm:justify-between"
                      >
                        {/* Module Name and Duration */}
                        <div className="text-start sm:text-left sm:w-[25%] md:w-full lg:w-[25%]">
                          <h3 className="text-sm font-bold text-gray-800">
                            {module.modulename}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {module.duration}
                          </p>
                        </div>

                        {/* Description */}
                        <div className="text-start sm:text-left mt-2 sm:mt-0 sm:w-[65%] md:w-full lg:w-[65%]">
                          <p className="text-xs text-gray-600">
                            {module.description}
                          </p>
                        </div>

                        {/* Start Button */}
                        <div className="text-start sm:text-right mt-2 sm:mt-0 sm:w-[10%] ">
                          <Link
                            href={`/courses/module/${module.modulename.replace(
                              / /g,
                              "-"
                            )}`}
                          >
                            <button className="px-2 py-1 text-[10px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-semibold text-gray-700 bg-transparent border border-gray-800 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
                              Start
                            </button>
                          </Link>
                        </div>
                        
                      </div>
                    ))}

                  {/* Mensaje si no hay cursos relacionados */}
                  {modulesData.filter(
                    (module) => module.courseid === selectedCourse.courseid
                  ).length === 0 && (
                    <p className="text-gray-600 mt-4">
                      No modules available for this Course.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">
                  Click on a Course to see Modules Available.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>No courses available for this program.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
