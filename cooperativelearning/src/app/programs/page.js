import { supabase } from "../lib/supabaseClient"
import Link from "next/link";

export default async function Programs () {
   const {data: programs, error} = await supabase
   .from('programs')
   .select('*')

   if(error){

    console.log('Error getting programs:', error);
    return <div>Error loading programs</div>
   }
       
   
   return (
    <div>
      <h1>Programs</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <h2>
              <Link href={`/programs/${program.id}`}>
                {program.programname}
              </Link>
            </h2>
            <p>{program.description}</p>
            <p>Duration: {program.duration}</p>
            <p>Cost: ${program.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



