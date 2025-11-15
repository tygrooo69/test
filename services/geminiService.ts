import { GoogleGenAI, Chat, GenerateContentResponse, ChatCallbacks } from "@google/genai";
import { GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_FLASH, GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_PRO } from '../constants';

const getGeminiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Initializes a chat session for a specific model and system instruction
export const createGeminiChat = (model: string, systemInstruction: string, callbacks?: ChatCallbacks): Chat => {
  const ai = getGeminiClient();
  return ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
      temperature: model === 'gemini-2.5-pro' ? 0.7 : 0.4, // Higher temperature for creative, lower for analytical
      topK: 40,
      topP: 0.95,
    },
    callbacks: callbacks,
  });
};

export const streamChatMessage = async (chat: Chat, message: string, onChunk: (chunk: GenerateContentResponse) => void): Promise<string> => {
  let fullResponse = '';
  try {
    const stream = await chat.sendMessageStream({ message: message });
    for await (const chunk of stream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c);
        fullResponse += c.text;
      }
    }
  } catch (error) {
    console.error("Error streaming message from Gemini:", error);
    throw error;
  }
  return fullResponse;
};