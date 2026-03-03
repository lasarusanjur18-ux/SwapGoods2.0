import { GoogleGenAI } from "@google/genai";

export async function generateItemDescription(title: string, category: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buatkan deskripsi singkat dan menarik untuk barang barter berikut:
      Nama Barang: ${title}
      Kategori: ${category}
      
      Gunakan bahasa yang santai, ramah, dan informatif. Maksimal 3 kalimat.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Gagal membuat deskripsi otomatis. Silakan tulis manual.";
  }
}
