import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import Contact from "./components/contact";
import { main } from "./styles";
import Intro from "./components/intro";
import Skills from "./components/skills";
import yaml from "js-yaml";
import fs from "fs";
import Experience from "./components/experience";
import Projects from "./components/project";
import Education from "./components/education";

type Resume = {
  name: string;
  contact: {
    mobile: string;
    github: string;
    linkedin: string;
    email: string;
  };
  summary: string;
  education: Array<{
    entity: string;
    major: string;
    credential: string;
    score: string;
    start?: number;
    end: number;
  }>;
  skills: Array<{
    name: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    link?: string;
    role?: string;
    details: string[];
    technologies: {
      languages?: string[];
      frameworks?: string[];
      concepts?: string[];
    };
  }>;
  experiences: Array<{
    entity: string;
    start: string;
    end: string;
    role: string;
    technologies: string[];
    details: string[];
  }>;
};

const data = yaml.load(fs.readFileSync("./data.yml", "utf8")) as Resume;
// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={main.page}>
      <Contact
        name={data.name}
        number={data.contact.mobile}
        email={data.contact.email}
        linkedin={data.contact.linkedin}
        github={data.contact.github}
      />
      <Intro content="Software developer with 4 years of hands-on experience building scalable mobile and backend systems across diverse domains. Passionate about writing readable, maintainable code, actively maintaining open source projects. Known for taking ownership of complex projects and driving impactful results independently and in cross-functional teams." />
      <Skills skills={data.skills} />
      <Experience experiences={data.experiences} />
      <Projects
        projects={data.projects.map((project) => {
          return {
            name: project.name,
            link: project.link,
            role: project.role,
            details: project.details,
            technologies: [
              ...(project.technologies.languages || []),
              ...(project.technologies.frameworks || []),
              ...(project.technologies.concepts || []),
            ],
          };
        })}
      />
      <Education educations={data.education} />
    </Page>
  </Document>
);

export default MyDocument;
