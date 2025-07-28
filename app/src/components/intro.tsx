import { Text } from "@react-pdf/renderer";
import React from "react";
import { text } from "../styles";
import { Section } from "./misc";

function Intro({ content }) {
  return (
    <Section>
      <Text style={text.body}>{content}</Text>
    </Section>
  );
}

export default Intro;
