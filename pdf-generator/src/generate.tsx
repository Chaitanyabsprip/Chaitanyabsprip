import React from "react";
import ReactPDF from "@react-pdf/renderer";
import MyDocument from "./resume";
import path from "path";

/**
 * Generate a PDF resume and save it to the specified filepath
 * @param filepath Path where the PDF should be saved
 * @returns Promise that resolves when PDF generation is complete
 */
export const generate = async (filepath: string): Promise<void> => {
  try {
    const absolutePath = path.resolve(filepath);
    await ReactPDF.render(<MyDocument />, absolutePath);
    console.log(`PDF successfully generated at: ${absolutePath}`);
    return Promise.resolve();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return Promise.reject(error);
  }
};

export default generate;
