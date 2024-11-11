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
      title: "Node js",
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
    <div className="programs-grid">
      {programs.map((program, index) => (
        <div className="program-card" key={index}>
          <h3>{program.title}</h3>
          <p>{program.description}</p>
          <a href={program.link} className="program-link">
            {program.linkText} →
          </a>
        </div>
      ))}
    </div>
  );
};

export default WebDevelopmentPrograms;
