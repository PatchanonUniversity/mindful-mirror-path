import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  const result = await ai.models.generateImages({
    model: "gemini-2.5-flash-image",
    prompt,
  });

  return result.generatedImages[0].image.imageBytes;
}
