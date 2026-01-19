import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorSettings } from "../types";
import { SYSTEM_INSTRUCTION_PROMPT_GEN } from "../constants";

// Initialize Gemini client
// Note: API Key must be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateJournalPrompts = async (settings: GeneratorSettings): Promise<string[]> => {
  try {
    const prompt = `
      Topic: ${settings.topic}
      Style: ${settings.style}
      Number of Prompts: ${settings.count}
      
      Generate ${settings.count} distinct, highly detailed prompts for generating a junk journal page image.
      Each prompt should describe a full page layout with specific elements related to the topic and style.
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
        temperature: 0.7,
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
      // Fallback: simple split if JSON fails (unlikely with responseSchema)
      return [settings.topic + " junk journal page, vintage style, high quality"];
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or key is missing
    return Array(settings.count).fill(`${settings.topic} junk journal page, ${settings.style} style, intricate details, scrapbooking paper texture, high resolution`);
  }
};