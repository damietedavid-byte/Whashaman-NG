import { GoogleGenAI } from "@google/genai";

export const getLaundryTip = async (): Promise<string> => {
  try {
    // By moving the initialization inside the function, we prevent the app from
    // crashing on load. The code that might fail (accessing process.env)
    // is now only executed when the user requests a tip, and it's wrapped
    // in a try/catch block to handle errors gracefully.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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
    // This will catch both the "process is not defined" ReferenceError
    // and any errors from the Gemini API client about an invalid/missing key.
    if (error instanceof Error && (error.name === 'ReferenceError' || error.message.toLowerCase().includes('api key'))) {
        return "AI Tips are currently unavailable. Please ensure the API_KEY is configured correctly.";
    }
    return "Sorry, I couldn't fetch a laundry tip at the moment. Please try again later.";
  }
};
