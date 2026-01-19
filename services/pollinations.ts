import { POLLINATIONS_API_KEY } from "../constants";

export const generatePollinationsImage = async (prompt: string, seed: number): Promise<string> => {
  // Use the authenticated endpoint provided in your curl example
  const baseUrl = 'https://gen.pollinations.ai/image';
  
  const params = new URLSearchParams({
    model: 'flux',
    width: '896',
    height: '1152',
    seed: seed.toString(),
    nologo: 'true',
    enhance: 'false'
  });

  const encodedPrompt = encodeURIComponent(prompt);
  const url = `${baseUrl}/${encodedPrompt}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${POLLINATIONS_API_KEY}`,
      }
    });

    if (!response.ok) {
      // Log specific help if authentication fails
      if (response.status === 401 || response.status === 403) {
        console.error("Pollinations Auth Error: Please check if your API Key is valid and has credits.");
      }
      
      const errorText = await response.text();
      throw new Error(`Pollinations API Error (${response.status}): ${errorText}`);
    }

    // Convert the response to a blob and create a local URL
    // This allows us to display the image while keeping the auth header logic in the fetch
    const blob = await response.blob();
    return URL.createObjectURL(blob);
    
  } catch (error) {
    console.error("Pollinations generation failed:", error);
    // If the authenticated fetch fails, we return null or throw to let the UI show an error state
    throw error;
  }
};