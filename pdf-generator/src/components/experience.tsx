import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { main, text } from "../styles";
import { BulletItem, Section } from "./misc";

interface ExperienceProps {
  experiences: {
    entity: string;
    start: string;
    end: string;
    role: string;
    technologies: string[];
    details: string[];
  }[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <Section style={main.section}>
      <Text style={[text.heading, { marginBottom: 8 }]}>Experience:</Text>
      {experiences.reverse().map((exp, index) => (
        <View
          key={`exp_${index}`}
          style={{ marginBottom: index === experiences.length - 1 ? 0 : 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={text.subHeading}>{exp.entity} </Text>
            <Text style={text.body}>
              ({exp.start} - {exp.end}):
            </Text>
            <Text style={text.body}> {exp.role}</Text>
          </View>
          <Text style={[text.body, { fontStyle: "italic", marginBottom: 4 }]}>
            {exp.technologies.join(", ")}
          </Text>
          {exp.details.map((detail, detailIndex) => (
            <BulletItem key={`exp_detail_${detailIndex}`}>{detail}</BulletItem>
          ))}
        </View>
      ))}
    </Section>
  );
};

export default Experience;
