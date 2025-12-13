/// <reference types="vite/client" />
import { GoogleGenAI } from "@google/genai";
import { ITINERARY_DATA } from '../constants';

// Access API key from Vite environment variables safely
// Using optional chaining (?.) prevents crashes if import.meta.env is undefined in some environments
const apiKey = import.meta.env?.VITE_GOOGLE_API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
你是「🍣 跟爹娘遊京阪」的 AI 導遊。你的使用者是一家人（包含父母）。
你的語氣應該：親切、有禮貌、簡單易懂（避免過多專有名詞）。

你擁有以下的行程資訊：
${JSON.stringify(ITINERARY_DATA)}

請根據使用者的問題回答。
1. 如果問行程，請參考上述資料。
2. 如果問景點介紹，請提供簡單有趣的歷史或特色。
3. 如果問交通，請給出最方便舒適的建議（考慮到有長輩）。
4. 如果問美食，推薦當地特色（如湯豆腐、懷石料理、大阪燒）。
5. 回答請保持簡短，適合在手機閱讀。
`;

export const chatWithGemini = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "請先設定 API Key 才能使用 AI 助手功能喔！(請確認 GitHub Secrets 或 .env 檔案)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "抱歉，我現在有點忙，請稍後再試。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "發生錯誤，請檢查網路連線或 API Key。";
  }
};