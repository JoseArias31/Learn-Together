import React from "react";
import "./styles/cards.css";  // Ensure to include CSS styles

const WebDevelopmentPrograms = () => {
  const programs = [
    {
      title: "HTML & CSS",
      description: "Dive into the world of web design and learn the building blocks of the web.",
      linkText: "Explore HTML & CSS",
      link: "/html-css"
    },
    {
      title: "JavaScript",
      description: "Uncover the power of JavaScript and enhance your web development skills.",
      linkText: "Explore JavaScript",
      link: "/javascript"
    },
    {
      title: "React",
      description: "Delve into the world of React and build dynamic user interfaces.",
      linkText: "Explore React",
      link: "/react"
    },
    {
      title: "Node.js",
      description: "Unlock the potential of server-side development with Node.js.",
      linkText: "Explore Node.js",
      link: "/nodejs"
    },
    {
      title: "Databases",
      description: "Learn about databases and how to manage data effectively.",
      linkText: "Explore Databases",
      link: "/databases"
    },
    {
      title: "DevOps",
      description: "Stay ahead of the curve with DevOps and continuous integration.",
      linkText: "Explore DevOps",
      link: "/devops"
    },
  ];

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program, index) => (
        <div
          className="program-card w-full max-w-[400px] mx-auto p-6 rounded-lg shadow-lg justify-center"
          style={{ background: "#000000bf" }}
          key={index}
        >
          <h3 className="text-green-400 text-xl font-bold mb-4">{program.title}</h3>
          <p className="text-white mb-4">{program.description}</p>
          <a
            href={program.link}
            className="program-link text-white hover:text-green-400 transition-colors duration-300"
          >
            {program.linkText} →
          </a>
        </div>
      ))}
    </div>
  );
};

export default WebDevelopmentPrograms;
