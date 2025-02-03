// import { supabase } from "../../lib/supabaseClient";
// import NavBar from "../../components/navBar";
// import Footer from "../../components/footer";
// import PropTypes from 'prop-types';

// // This function runs on each request to fetch the program and its courses
// export async function getServerSideProps({ params }) {
//   const { programname } = params;

//   // Fetch the program by name
//   const { data: programData, error: programError } = await supabase
//     .from("programs")
//     .select("*")
//     .eq("programname", programname)
//     .single(); // Assuming `programname` is unique

//   if (programError) {
//     return { props: { error: `Error fetching program: ${programError.message}` } };
//   }

//   // Fetch the courses for that program
//   const { data: coursesData, error: coursesError } = await supabase
//     .from("courses")
//     .select("*")
//     .eq("programid", programData.programid); // Foreign key to `programid`

//   if (coursesError) {
//     return { props: { error: `Error fetching courses: ${coursesError.message}` } };
//   }

//   return {
//     props: {
//       program: programData,
//       courses: coursesData,
//     },
//   };
// }

// export default function CoursesPage({ program, courses, error }) {
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <NavBar />
//       <div className="container mx-auto px-6 py-8">
//         <h1 className="text-3xl font-bold mb-6 capitalize">
//           {program.programname} Courses
//         </h1>

//         <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {courses.map((course) => (
//             <li
//               key={course.courseid}
//               className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
//             >
//               <h2 className="text-xl font-semibold">{course.coursename}</h2>
//               <p className="text-gray-600">{course.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Footer />
//     </>
//   );
// }

// CoursesPage.propTypes = {
//   program: PropTypes.shape({
//     programname: PropTypes.string.isRequired,
//   }).isRequired,
//   courses: PropTypes.arrayOf(
//     PropTypes.shape({
//       courseid: PropTypes.number.isRequired,
//       coursename: PropTypes.string.isRequired,
//       description: PropTypes.string,
//     })
//   ).isRequired,
//   error: PropTypes.string,
// };
