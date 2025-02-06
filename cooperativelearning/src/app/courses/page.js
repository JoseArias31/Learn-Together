import { supabase } from "../lib/supabaseClient";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Link from "next/link";

export default async function courses() {

    const{data: courses, error} = await supabase
    .from('courses')
    .select('*')

if(error){
    console.log("Error getting courses:", error);
    <div>Error loading Courses</div>
}

return (
    <>
    <NavBar />
    <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      
    <div className=" max-w-6xl mx-auto px-6 py-12">
     
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Courses</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.courseid} className="group">
            <Link
  href={`/courses/${course.coursename.replace(/ /g, '-')}`} // Reemplaza espacios con guiones
  className="block h-full rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
>
  

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.coursename}
                </h2>
                <p className="text-gray-600 text-sm">{course.description}</p>
                <div className="flex justify-between">
                <p className="mt-2 text-gray-900 text-sm">{course.duration}</p>
                
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </div>
    </>
  );


}