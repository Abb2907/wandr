import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { message, itinerary } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      // Fallback to simple logic if no API key
      let reply = "I'm looking into that for you. As your Wandr AI concierge, I can help you adjust your itinerary, find local dining spots, or check live weather updates.";
      
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("food") || lowerMsg.includes("eat") || lowerMsg.includes("restaurant") || lowerMsg.includes("dinner") || lowerMsg.includes("lunch")) {
        reply = "I can definitely recommend some great places to eat! Based on your budget and destination, there are several highly-rated local restaurants. Would you like me to add a reservation to your itinerary?";
      } else if (lowerMsg.includes("weather") || lowerMsg.includes("rain") || lowerMsg.includes("sun")) {
        reply = "The weather forecast shows a mix of sun and clouds for your trip dates. I'll continuously monitor for any severe changes and automatically suggest itinerary re-optimizations if outdoor activities are affected.";
      } else if (lowerMsg.includes("change") || lowerMsg.includes("remove") || lowerMsg.includes("add") || lowerMsg.includes("update")) {
        reply = "No problem! I can dynamically re-optimize your itinerary. Which specific activity would you like to modify, and do you have any new preferences for its replacement?";
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ reply });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are Wandr, a premium AI travel concierge. 
    You are assisting a user with their trip ${itinerary ? `to ${itinerary.destination}` : ''}.
    Current Itinerary Details: ${JSON.stringify(itinerary?.parsedPlan || 'Not generated yet')}.
    Be helpful, professional, and proactive. If they ask about changes, suggest how you can re-optimize their plan.
    Keep responses concise but premium.`;

    const result = await model.generateContent([systemPrompt, message]);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
