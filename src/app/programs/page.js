import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { SearchProgram } from "../components/searchProgram";

export default async function Programs() {
  const { data: programs, error } = await supabase.from("programs").select("*");

  if (error) {
    console.log("Error getting programs:", error);
    return <div>Error loading programs</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
  <NavBar />
  <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex-grow">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Programs
      </h1>
      <p className="text-center">
        Choose a program that aligns with your goals and start building your future today.
      </p>
      <SearchProgram />
    </div>
  </div>
  <Footer />
</div>
  );
}
