import { GoogleGenAI } from "@google/genai";

export const getLaundryTip = async (): Promise<string> => {
  // Explicitly check for the API key. This is a robust way to handle
  // environments where `process.env` might not be defined or the key is missing.
  if (typeof process === 'undefined' || !process.env.API_KEY) {
      console.error("Gemini API key not found. Please set the API_KEY environment variable.");
      return "AI Tips are currently unavailable. Please ensure the API_KEY is configured correctly.";
  }

  try {
    // The key is confirmed to exist at this point.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    // This catch block now handles errors from the API call itself (e.g., network issues)
    return "Sorry, I couldn't fetch a laundry tip at the moment. Please try again later.";
  }
};