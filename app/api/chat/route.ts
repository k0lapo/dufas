import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // THIS IS YOUR "KNOWLEDGE BASE"
      systemInstruction: `
        You are the official assistant for the Dr. Ufadime Seyi-Akinnubi Foundation.
        Use the following information to answer user questions:

        FOUNDATION DETAILS:
        - Email: [Your Email Here, e.g., info@foundation.org]
        - Phone: [Your Phone Number Here]
        - Address: [Your Office Address]
        - Mission: We provide maternal health screenings and child dental care (ages 3-15).
        - Donation Account: Fidelity Bank Nigeria, Account: 5601593309.
        - Founder: Dr. Ufadime Seyi-Akinnubi.

        RULES:
        1. If you don't know an answer, ask the user to email [Your Email].
        2. Be professional, warm, and empathetic.
        3. Use bullet points for long lists to make them easy to read.
      `
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Offline" }, { status: 500 });
  }
}