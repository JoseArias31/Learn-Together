import { useState, useEffect } from "react";
import { ProgramsOptions } from "../data/programsList";

export const AutoChangingText = () => {
  const [currentText, setCurrentText] = useState(""); // Current text to display
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current program
  const [isAdding, setIsAdding] = useState(true); // Whether we are adding or removing letters

  useEffect(() => {
    const currentProgram = ProgramsOptions[currentIndex];
    let interval;

    if (isAdding) {
      // Add letters one by one
      interval = setInterval(() => {
        setCurrentText((prev) =>
          prev.length < currentProgram.length
            ? currentProgram.slice(0, prev.length + 1)
            : prev
        );
        if (currentText === currentProgram) {
          clearInterval(interval);
          setTimeout(() => setIsAdding(false), 2000); // Pause before erasing
        }
      }, 100); // Typing speed
    } else {
      // Remove letters one by one
      interval = setInterval(() => {
        setCurrentText((prev) =>
          prev.length > 0 ? prev.slice(0, -1) : prev
        );
        if (currentText === "") {
          clearInterval(interval);
          setIsAdding(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % ProgramsOptions.length); // Move to the next program
        }
      }, 100); // Erasing speed
    }

    return () => clearInterval(interval); // Cleanup interval
  }, [currentText, isAdding, currentIndex]);

  return (
    <div className="relative hidden lg:flex w-[500px]">
      <input
        type="text"
        placeholder={`${currentText}`}
        className="border-green-400 w-full py-2 pl-10 pr-4 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5"
        readOnly
      />
    </div>
  );
};
