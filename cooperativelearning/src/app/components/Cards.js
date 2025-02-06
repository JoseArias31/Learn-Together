import React, { useEffect, useState } from "react";
import "./styles/cards.css"; // Keeping your styles
import { supabase } from "../lib/supabaseClient";

const WebDevelopmentPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase.from("programs").select("*");
        if (error) throw error;
        setPrograms(data || []);
      } catch (error) {
        setError("Failed to load programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <p className="text-center text-white">Loading programs...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : programs.length > 0 ? (
        programs.map((program) => (
          <div
            className="program-card w-full max-w-[400px] mx-auto p-6 rounded-lg shadow-lg justify-center"
            style={{ background: "#000000bf" }}
            key={program.programid}
          >
            <h3 className="text-green-400 text-xl font-bold mb-4">{program.programname}</h3>
            <p className="text-white mb-4">{program.description}</p>
            <a
              href={`/programs/${program.programname.replace(/ /g, '-')}`}
              className="program-link text-white hover:text-green-400 transition-colors duration-300"
            >
              Explore →
            </a>
          </div>
        ))
      ) : (
        <p className="text-center text-white">No programs available.</p>
      )}
    </div>
  );
};

export default WebDevelopmentPrograms;
