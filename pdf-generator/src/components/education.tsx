import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { text } from "../styles";
import { Section } from "./misc";

interface EducationProps {
  educations: {
    entity: string;
    major?: string;
    credential: string;
    score: string;
    start?: number;
    end: number;
  }[];
}

const Education: React.FC<EducationProps> = ({ educations }) => {
  return (
    <Section>
      <Text style={[text.heading, { marginBottom: 8 }]}>Education:</Text>
      {educations.map((edu, index) => (
        <View
          key={`edu_${index}`}
          style={{ marginBottom: index === educations.length - 1 ? 0 : 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            {edu.major && <Text style={text.subHeading}>{edu.major} - </Text>}
            <Text style={edu.major ? text.body : text.subHeading}>
              {edu.credential}
            </Text>
          </View>
          <Text style={text.body}>
            {edu.entity}, {edu.end}
          </Text>
          {edu.score && (
            <Text style={[text.body, { fontStyle: "italic", marginBottom: 4 }]}>
              Score: {edu.score}
            </Text>
          )}
        </View>
      ))}
    </Section>
  );
};

export default Education;
