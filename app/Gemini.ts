import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
import { Context } from "hono";

export const createChatSession = (c: Context) => {
  const apiKey = c.env.GEMINI_API; // Accessing the API key from context
  const genAI = new GoogleGenerativeAI(apiKey);
  console.log(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  return model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
  });
};

export const sendMessageToGemini = async (
  chatSession: any,
  message: string
) => {
  const result = await chatSession.sendMessage(message);
  return result.response.text();
};
