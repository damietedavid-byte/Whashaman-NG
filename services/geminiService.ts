
import { GoogleGenAI } from "@google/genai";

// Initialize the client directly using process.env.API_KEY as per the instructions.
// The previous implementation crashed because it tried to read `process.env.API_KEY` into a
// separate constant, causing a reference error in the browser where `process` is not defined.
// The GenAI library and the execution environment are expected to handle the `process.env` part.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getLaundryTip = async (): Promise<string> => {
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
    // The original code had a check that would return a specific message for a missing key.
    // We can do something similar by inspecting the error from the API call itself.
    if (error instanceof Error && error.message.toLowerCase().includes('api key')) {
        return "API Key not configured. Please set the API_KEY environment variable to use the AI Laundry Tips feature.";
    }
    return "Sorry, I couldn't fetch a laundry tip at the moment. Please try again later.";
  }
};
