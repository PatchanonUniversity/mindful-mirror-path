import { GameState } from "@/components/game/GameContainer";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getFutureSelfMessage = async (state: GameState) => {
  const prompt = `
คุณคือ 'Future Self' (ตัวตนในอนาคต) ที่มีความเมตตา
จงประมวลผลข้อมูลของ ${state.userName}
ที่ชอบ ${state.userHobby}
และอยากทำ ${state.userDream}
โดยตอนนี้รู้สึก ${state.userFeeling}
ซึ่งตอนนี้กำลังไล่ตาม ${state.userChasing}ี
ชีวิตช่วงนี้คือ ${state.userLife}
เขาเพิ่งวางความคาดหวังเรื่อง '${state.userExpectation}'
ทิ้งไว้ในตะกร้า

จงเลือก 'ดอกไม้' 1 ชนิด
ตอบกลับเป็น JSON เท่านั้น:
{
  "name": "ชื่อดอกไม้",
  "meaning": "เหตุผลที่กินใจ โดยลงท้ายว่า 'ไม่ว่าผลลัพธ์จะเป็นยังไง ชั้นภูมิใจในตัวเธอเสมอนะ'"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error(error);
    return {
      name: "ดอกเดซี่",
      meaning: "ไม่ว่าผลลัพธ์จะเป็นยังไง ชั้นภูมิใจในตัวเธอเสมอนะ",
    };
  }
};
