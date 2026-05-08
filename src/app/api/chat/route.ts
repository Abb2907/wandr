import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, itinerary } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // To implement the actual OpenAI API, uncomment the following block and install 'openai'
    /*
    import OpenAI from 'openai';
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Construct system prompt with itinerary context
    const systemPrompt = `You are Wandr, a premium AI travel concierge. 
    You are assisting a user with their trip ${itinerary ? `to ${itinerary.destination}` : ''}.
    Current Itinerary Details: ${JSON.stringify(itinerary?.parsedPlan || 'Not generated yet')}`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "gpt-4-turbo-preview",
    });
    
    return NextResponse.json({ reply: completion.choices[0].message.content });
    */

    // Placeholder simulated intelligence (until API key is added)
    let reply = "I'm looking into that for you. As your Wandr AI concierge, I can help you adjust your itinerary, find local dining spots, or check live weather updates.";
    
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("food") || lowerMsg.includes("eat") || lowerMsg.includes("restaurant") || lowerMsg.includes("dinner") || lowerMsg.includes("lunch")) {
      reply = "I can definitely recommend some great places to eat! Based on your budget and destination, there are several highly-rated local restaurants. Would you like me to add a reservation to your itinerary?";
    } else if (lowerMsg.includes("weather") || lowerMsg.includes("rain") || lowerMsg.includes("sun")) {
      reply = "The weather forecast shows a mix of sun and clouds for your trip dates. I'll continuously monitor for any severe changes and automatically suggest itinerary re-optimizations if outdoor activities are affected.";
    } else if (lowerMsg.includes("change") || lowerMsg.includes("remove") || lowerMsg.includes("add") || lowerMsg.includes("update")) {
      reply = "No problem! I can dynamically re-optimize your itinerary. Which specific activity would you like to modify, and do you have any new preferences for its replacement?";
    } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      reply = `Hello! I'm your Wandr AI concierge. I see you're planning a trip${itinerary ? ` to ${itinerary.destination}` : ''}. How can I assist you today?`;
    }

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1200));

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
