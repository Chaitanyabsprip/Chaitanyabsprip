import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Century Gothic",
  fonts: [
    { src: "public/centurygothic.ttf", fontWeight: "normal" },
    { src: "public/centurygothic-bold.ttf", fontWeight: "bold" },
    { src: "public/centurygothic-italic.ttf", fontStyle: "italic" },
    {
      src: "public/centurygothic-bolditalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});
Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});
Font.registerHyphenationCallback((word) => [word]); // disable hyphenation

const text = StyleSheet.create({
  title: {
    fontFamily: "Century Gothic",
    fontSize: 20,
    color: "#6D9EEB",
    fontWeight: "bold",
  },
  contact: {
    fontFamily: "Century Gothic",
    fontSize: 8,
    color: "black",
    textDecoration: "none",
  },
  body: {
    fontFamily: "Century Gothic",
    textAlign: "justify",
    fontSize: 10,
  },
  heading: {
    fontFamily: "Century Gothic",
    fontSize: 12,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  subHeading: {
    fontFamily: "Century Gothic",
    fontSize: 10,
    fontWeight: "bold",
  },
  hyperlink: {
    fontFamily: "Century Gothic",
    fontSize: 10,
    color: "blue",
  },
});

const main = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  section: {
    marginVertical: 6,
  },
});

export { text, main };
