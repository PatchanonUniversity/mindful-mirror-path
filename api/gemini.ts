// api/gemini.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const state = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
คุณคือ 'Future Self' (ตัวตนในอนาคต) ที่มีความเมตตา
จงประมวลผลข้อมูลของ ${state.userName}
ที่ชอบ ${state.userHobby}
และอยากทำ ${state.userDream}
โดยตอนนี้รู้สึก ${state.userFeeling}
ซึ่งตอนนี้กำลังไล่ตาม ${state.userChasing}
ชีวิตช่วงนี้คือ ${state.userLife}
เขาเพิ่งวางความคาดหวังเรื่อง '${state.userExpectation}'
ทิ้งไว้ในตะกร้า
เหตุผลต้องเชื่อมโยงกับ hobby, dream และ feeling
จงเลือกดอกไม้ 1 ชนิดที่ห้ามใช้สัญลักษณ์ทางศาสนา
ต้องเป็นดอกไม้ที่สะท้อน hobby, dream และ feeling โดยตรง
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

    const text = response.text ?? "";
    const cleanJson = text.replace(/```json|```/g, "").trim();

    return res.status(200).json(JSON.parse(cleanJson));
  } catch (error) {
    return res.status(200).json({
      name: "ดอกเดซี่",
      meaning:
        "ดอกเดซี่เป็นสัญลักษณ์ของชีวิตที่เรียบง่ายแต่มั่นคง เติบโตได้แม้ในพื้นที่ธรรมดา ไม่ต้องโดดเด่นหรือสมบูรณ์แบบเพื่อจะมีคุณค่า สื่อถึงการเริ่มต้นใหม่ ความบริสุทธิ์ใจ และความหวังเล็ก ๆ ที่คอยย้ำเตือนว่า ต่อให้โลกจะวุ่นวายหรือโหดร้ายเพียงใด เราก็ยังสามารถยืนหยัด เป็นตัวของตัวเอง และค่อย ๆ เบ่งบานในจังหวะของเราได้เสมอ ไม่ว่าผลลัพธ์จะเป็นยังไง ชั้นภูมิใจในตัวเธอเสมอนะ",
    });
  }
}
