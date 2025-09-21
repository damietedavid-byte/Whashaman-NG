
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd have better error handling or a check at startup.
  // For this prototype, we'll allow it to fail gracefully if the key is missing.
  console.warn("API_KEY environment variable not set for Gemini service.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getLaundryTip = async (): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key not configured. Please set the API_KEY environment variable to use the AI Laundry Tips feature.");
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Give me a short, useful, and uncommon laundry tip for people dealing with the climate in Nigeria (e.g., humidity, Harmattan season). Make it friendly and easy to understand.',
        config: {
            temperature: 0.8,
            topK: 40,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching laundry tip from Gemini:", error);
    return "Sorry, I couldn't fetch a laundry tip at the moment. Please try again later.";
  }
};
