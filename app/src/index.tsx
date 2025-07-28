import React from "react";
import ReactPDF from "@react-pdf/renderer";
import MyDocument from "./resume";

ReactPDF.render(<MyDocument />, `resume.pdf`);
