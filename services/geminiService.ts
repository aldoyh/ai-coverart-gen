
import { GoogleGenAI } from "@google/genai";

export const generateCoverArt = async (title: string, aspectRatio: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fullPrompt = `Create cinematic, high-quality ${aspectRatio} cover art for a YouTube video or podcast episode titled: "${title}". The style should be epic, highly detailed, with vibrant colors and professional graphic design elements. Do not include any text in the image.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. Please try a different title.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("The API key is invalid. Please check your configuration.");
    }
    throw new Error("Failed to generate image. The model may be unavailable or the request could not be processed.");
  }
};
