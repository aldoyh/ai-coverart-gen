
import { GoogleGenAI } from "@google/genai";
import { StylePreset } from '../types';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateCoverArt = async (
  title: string,
  aspectRatio: string,
  stylePreset: StylePreset
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please add GEMINI_API_KEY to your .env.local file.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fullPrompt = `${stylePreset.prompt} Theme: "${title}". Aspect ratio: ${aspectRatio}. Do not include any text or typography in the image itself.`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
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
        throw new Error("No image was generated. Please try a different title or style.");
      }
    } catch (error) {
      console.error(`Error generating image (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on API key errors
      if (lastError.message.includes('API key')) {
        throw new Error("The API key is invalid. Please check your .env.local file and ensure GEMINI_API_KEY is set correctly.");
      }

      // Don't retry on content policy violations
      if (lastError.message.includes('content') || lastError.message.includes('policy')) {
        throw new Error("The content violates safety policies. Please try a different title.");
      }

      // Retry on network or temporary errors
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * (attempt + 1)); // Exponential backoff
        continue;
      }
    }
  }

  // All retries exhausted
  throw new Error(
    lastError?.message ||
    "Failed to generate image after multiple attempts. The service may be temporarily unavailable. Please try again later."
  );
};
