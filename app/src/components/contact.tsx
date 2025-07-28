import React from "react";
import { text } from "../styles";

import { Link, Text, View } from "@react-pdf/renderer";
interface ContactProps {
  name: string;
  number: string;
  email: string;
  linkedin?: string;
  github?: string;
}

const Contact: React.FC<ContactProps> = ({
  name,
  number,
  email,
  linkedin,
  github,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text id="candidate-name" style={[text.title, { marginTop: 4 }]}>
        {name}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 5, gap: 8 }}>
        <Text id="contact-number" style={text.contact}>
          📞 {number}
        </Text>
        <Text id="contact-email" style={text.contact}>
          📧 {email}
        </Text>
        {linkedin && (
          <Link id="linkedin-url" style={[text.contact, { color: "#073763" }]}>
            🔗 {linkedin}
          </Link>
        )}
        {github && (
          <Link id="github-url" style={[text.contact, { color: "#073763" }]}>
            🔗 {github}
          </Link>
        )}
      </View>
    </View>
  );
};

export default Contact;
