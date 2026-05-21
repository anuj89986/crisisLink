import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeIncidentSeverity(imagePath) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const prompt = `Analyze this incident image and determine its severity level.
    Respond with ONLY one of these exact words: "low", "medium", "high"
    
    Severity Guidelines:
    - low: Minor issue, no immediate danger
    - medium: Moderate damage or risk
    - high: Serious damage, potential danger`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response.text().trim().toLowerCase();

    const validSeverities = ["low", "medium", "high"];
    return validSeverities.includes(response) ? response : "medium";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "medium"; // default fallback
  }
}