import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { text } from "../styles";
import { Section } from "./misc";

interface SkillsProps {
  skills: {
    name: string;
    items: string[];
  }[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <Section>
      <Text style={[text.heading, { marginBottom: 8 }]}>Skills:</Text>
      {skills.map((skill, index) => (
        <View
          key={`skills_${index}`}
          style={{
            flexDirection: "row",
            marginBottom: 6,
            alignItems: "flex-start",
          }}
        >
          <Text style={[text.subHeading, { width: "30%" }]}>{skill.name}</Text>
          <Text style={[text.body, { width: "70%", fontStyle: "italic" }]}>
            {skill.items.join(", ")}
          </Text>
        </View>
      ))}
    </Section>
  );
};

export default Skills;
