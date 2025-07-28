import { Text, View } from "@react-pdf/renderer";
import React, { ReactNode } from "react";
import { main, text } from "../styles";

interface SectionProps {
  children: ReactNode;
  style?: any;
}

const Section: React.FC<SectionProps> = ({ children, style }) => {
  return (
    <View wrap={false} style={[main.section, style]}>
      {children}
    </View>
  );
};

const BulletItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
    <Text style={[text.body, { paddingHorizontal: 8 }]}>•</Text>
    <Text style={[text.body, { maxWidth: "96%" }]}>{children}</Text>
  </View>
);

export { Section, BulletItem };
