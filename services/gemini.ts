import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorSettings } from "../types";
import { SYSTEM_INSTRUCTION_PROMPT_GEN } from "../constants";

export const generateJournalPrompts = async (settings: GeneratorSettings): Promise<string[]> => {
  try {
    // Initialize Gemini client inside the function to prevent top-level crashes
    // if the API key is missing or empty during module evaluation.
    const apiKey = process.env.API_KEY;
    
    // If no key is present, throw immediately to trigger the fallback in the catch block
    if (!apiKey) {
      throw new Error("API Key is missing or empty in process.env.API_KEY");
    }

    const ai = new GoogleGenAI({ apiKey });

    // We explicitly instruct Gemini to combine the user's topic with the specific visual style
    // seen in the reference images (Watercolor + Ink + Vintage Paper Backgrounds).
    const prompt = `
      Target Topic: "${settings.topic}"
      Target Aesthetic: "${settings.style}"
      Quantity: ${settings.count}
      
      Create ${settings.count} distinct image generation prompts.
      
      CRITICAL VISUAL REQUIREMENTS FOR EVERY PROMPT:
      - The main subject (${settings.topic}) must be depicted in a "watercolor and ink illustration" style.
      - The background MUST be described as "vintage textured paper", "old maps", or "handwritten script".
      - Include "collage elements" like stamps, butterflies, or flowers surrounding the subject.
      - End every prompt with: "shabby chic, high definition, 8k, intricate details, flat lay composition".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PROMPT_GEN,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        },
        temperature: 0.75, // Slightly higher for more creative variety
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Parse the JSON response safely
    try {
      const prompts = JSON.parse(text) as string[];
      return prompts;
    } catch (e) {
      console.error("Failed to parse Gemini JSON response", e);
      // Fallback
      return [`Watercolor and ink illustration of ${settings.topic}, vintage map background, junk journal style, detailed`];
    }

  } catch (error) {
    console.error("Gemini API Error (using fallback):", error);
    // Enhanced Fallback to match the requested style even without AI
    return Array(settings.count).fill(`Watercolor and ink illustration of ${settings.topic}, on background of old handwritten letters and vintage maps, ${settings.style} style, shabby chic, butterflies and stamps, high resolution, 8k`);
  }
};