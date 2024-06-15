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
    <div className="courses-grid">
      {courses.map((course, index) => (
        <div className="course-card" key={index}>
          <div className="course-icon">{course.icon}</div>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <a href={course.link} className="enroll-button">Enroll</a>
        </div>
      ))}
    </div>
  );
};

export default Courses;
