import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `
You are an expert IT support specialist, acting as a conversational AI assistant named "Tech Compass". 
Your goal is to help a non-technical user solve their computer problem through a simple, step-by-step interactive process.

Key behaviors:
- Analyze the user's problem description and any screenshot they provide.
- Ask clarifying questions to understand the issue. Provide only one question at a time.
- Provide simple, step-by-step instructions. Give only ONE clear, actionable step at a time.
- Wait for the user to respond after you give an instruction.
- Keep your responses very concise, friendly, and easy to understand. Use simple language.
- When you ask a question (e.g., "Is the light blinking?"), you MUST provide short, common answers as suggestions that can be displayed as buttons. 
- To provide suggestions, add a new line at the very end of your response starting with "Suggestions:" followed by a comma-separated list.
- Example format:
  Is the printer turned on?
  Suggestions: Yes, No, I'm not sure
- Only provide suggestions when you are asking a direct question.
- If you need a visual, ask the user to "Please share a screenshot."
- End the conversation by confirming if the issue is resolved.
`;

export const startChatSession = (): Chat => {
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
      tools: [{googleSearch: {}}],
    },
  });
  return chat;
};

const extractSources = (response: GenerateContentResponse): GroundingSource[] | undefined => {
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    if (!groundingMetadata?.groundingChunks) {
        return undefined;
    }
    const sources: GroundingSource[] = [];
    for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web) {
            sources.push({
                uri: chunk.web.uri,
                title: chunk.web.title || chunk.web.uri,
            });
        }
    }
    return sources.length > 0 ? sources : undefined;
}

const parseResponse = (responseText: string): { text: string; suggestions?: string[] } => {
    const lines = responseText.split('\n');
    const lastLine = lines[lines.length - 1];
    
    if (lastLine.toLowerCase().startsWith('suggestions:')) {
        const suggestions = lastLine.substring(12).split(',').map(s => s.trim()).filter(Boolean);
        const mainText = lines.slice(0, -1).join('\n').trim();
        return { text: mainText, suggestions };
    }
    
    return { text: responseText.trim() };
};

export const sendMessage = async (
    chat: Chat, 
    messageText: string, 
    imageBase64: string | null
): Promise<ChatMessage> => {
  try {
    const parts: any[] = [{ text: messageText }];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64,
        },
      });
    }

    const response = await chat.sendMessage({ message: parts });
    
    const sources = extractSources(response);
    const { text, suggestions } = parseResponse(response.text);

    const modelResponse: ChatMessage = {
      role: 'model',
      text: text,
      sources: sources,
      suggestions: suggestions
    };

    return modelResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw the original error to allow for more specific handling in the UI.
    // This provides more context than a generic error message.
    throw error;
  }
};