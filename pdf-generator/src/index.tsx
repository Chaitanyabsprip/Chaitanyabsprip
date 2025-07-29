import { generate } from "./generate";

// When run directly from command line, generate PDF with default filename
if (require.main === module) {
  const outputPath = process.argv[2] || "shared/resume.pdf";
  generate(outputPath)
    .then(() => console.log("PDF generation completed"))
    .catch((err) => console.error("PDF generation failed:", err));
}

export { generate };
