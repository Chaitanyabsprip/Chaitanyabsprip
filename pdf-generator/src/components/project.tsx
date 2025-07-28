import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { text } from "../styles";
import { BulletItem, Section } from "./misc";

interface TProjectProps {
  name: string;
  link?: string;
  role?: string;
  details: string[];
  technologies: string[];
  index: number;
}

interface ProjectsProps {
  projects: {
    name: string;
    link?: string;
    role?: string;
    details: string[];
    technologies: string[];
  }[];
}

const Project: React.FC<TProjectProps> = ({
  name,
  link,
  role,
  details,
  technologies,
  index,
}) => {
  return (
    <View key={index} style={{ marginBottom: 8 }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={[text.subHeading]}>
          {name}
          {role && !role.includes("Inventor") ? ` - ${role}` : ""}
        </Text>
        {link && <Text style={text.hyperlink}>{link}</Text>}
      </View>
      <Text style={[text.body, { fontStyle: "italic" }]}>
        {technologies.join(", ")}
      </Text>
      {details.map((detail, idx) => (
        <BulletItem key={`p_detail_${idx}`}>{detail}</BulletItem>
      ))}
    </View>
  );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <Section>
      <Text style={[text.heading, { marginBottom: 8 }]}>Projects:</Text>
      {projects.map((project, index) => (
        <Project
          key={`project_${index}`}
          name={project.name}
          link={project.link}
          role={project.role}
          details={project.details}
          technologies={project.technologies}
          index={index}
        />
      ))}
    </Section>
  );
};

export default Projects;
