import express, { Request, Response } from "express";
import { generate } from "./generate";
import path from "path";

interface GenerateRequestBody {
  filepath?: string;
}

interface HealthResponse {
  status: string;
}

interface GenerateSuccessResponse {
  success: boolean;
  message: string;
  filepath: string;
}

interface GenerateErrorResponse {
  error: string;
  message: string;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (_: Request, res: Response<HealthResponse>) => {
  res.status(200).json({ status: "ok" });
});

/**
 * PDF Generation endpoint
 * Accepts an optional filepath in the request body and generates a PDF at that location
 * Defaults to resume.pdf at the root of the project if no filepath is provided
 */
app.post(
  "/generate",
  async (
    req: Request<{}, {}, GenerateRequestBody>,
    res: Response<GenerateSuccessResponse | GenerateErrorResponse>,
  ) => {
    try {
      // Get filepath from request body or use default
      let { filepath } = req.body;

      // If filepath is not provided or invalid, use default
      if (!filepath || typeof filepath !== "string") {
        filepath = path.resolve("shared/resume.pdf");
      } else {
        // Resolve to absolute path if it's a relative path
        filepath = path.resolve(filepath);
      }

      await generate(filepath);

      return res.status(200).json({
        success: true,
        message: "PDF generated successfully",
        filepath: path.resolve(filepath),
      });
    } catch (error) {
      console.error("Error in /generate endpoint:", error);
      return res.status(500).json({
        error: "Failed to generate PDF",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`PDF Generator server running on port ${PORT}`);
  });
}

export default app;
