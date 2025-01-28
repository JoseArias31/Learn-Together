import React from "react";
import "./styles/coursecards.css";

const courses = [
  {
    title: "Introduction to Programming",
    description: "Learn the fundamentals of programming and build your first application.",
    icon: "📱", // This can be replaced with an actual icon/image
    link: "/enroll/intro-to-programming"
  },
  {
    title: "Advanced JavaScript",
    description: "Dive deep into JavaScript and master advanced concepts.",
    icon: "💻",
    link: "/enroll/advanced-javascript"
  },
  {
    title: "Database Fundamentals",
    description: "Learn how to design and manage databases for your applications.",
    icon: "🗄️",
    link: "/enroll/database-fundamentals"
  },
  {
    title: "Cloud Computing Essentials",
    description: "Explore the world of cloud computing and learn how to leverage it.",
    icon: "☁️",
    link: "/enroll/cloud-computing-essentials"
  }
];

const Courses = () => {
  return (
    <div className="courses-grid grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 gap-6 p-2">

    {courses.map((course, index) => (
      <div
         className="course-card w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] mx-auto p-4 rounded-lg shadow-lg"
        style={{ background: "#000000bf" }}
        key={index}
      >
        <h3 className="text-green-400 text-xl font-bold mb-4">{course.title}</h3>
        <p className="text-white mb-6">{course.description}</p>
        <a href={course.link} className="text-blue-400 underline">
          Learn more
        </a>
      </div>
    ))}
  </div>
  
  );
};

export default Courses;
