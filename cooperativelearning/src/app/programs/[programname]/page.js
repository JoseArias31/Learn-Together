/* eslint-disable react/prop-types */
import { supabase } from "src/app/lib/supabaseClient";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";


export default async function ProgramPage({ params }) {
  const programname = params.programname.replace(/-/g, ' ');

  // 1. Fetch the program by name
  const { data: programData, error: programError } = await supabase
    .from("programs")
    .select("*")
    .eq("programname", programname)
    .single(); // Assuming `programname` is unique

    

  if (programError) {
    console.error(`Error fetching program: ${programError.message}`);
    return <div>Error loading program. Please try again later.</div>;
  }

  if (!programData) {
    return <div>Program not found.</div>;
  }

  // 2. Fetch courses for the program using programData.programid
  const { data: coursesData, error: coursesError } = await supabase
    .from("courses")
    .select("*")
    .eq("programid", programData.programid); // Foreign key to `programid`

  if (coursesError) {
    console.error(`Error fetching courses: ${coursesError.message}`);
    return <div>Error loading courses. Please try again later.</div>;
  }

  

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {programData.programname} Courses
        </h1>

        {coursesData.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesData.map((course) => (
              <li
                key={course.courseid}
                className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold">{course.coursename}</h2>
                <div className="flex flex-col gap-6 ">
                <p className="text-gray-600">{course.description}</p>
                <p className="text-gray-600">{course.duration}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses available for this program.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

