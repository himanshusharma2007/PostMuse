// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generatePrompt(parameters) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const promptForGemini = createPromptForGemini(parameters);

  try {
    const result = await model.generateContent(promptForGemini);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
}

export async function generatePost(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating post:", error);
    throw error;
  }
}

function createPromptForGemini(parameters) {
  const {
    tone,
    emotion,
    postType,
    length,
    emojiUsage,
    hashtagPreference,
    message,
    targetAudience,
    keywords,
  } = parameters;

  return `
    Create a detailed and structured prompt for a social media post with the following parameters:
    - Tone: ${tone.value}
    - Emotion: ${emotion.value}
    - Post Type: ${postType.value}
    - Length: ${length.value}
    - Emoji Usage: ${emojiUsage.value}
    - Hashtag Preference: ${hashtagPreference.value}
    - Main Message: ${message}
    - Target Audience: ${targetAudience}
    - Keywords: ${keywords}

    The prompt should be comprehensive and guide the creation of a compelling social media post. 
    Include specific instructions on how to incorporate the tone, emotion, and other parameters.
    Structure the prompt in a way that it can be used to generate a high-quality social media post.
  `;
}
