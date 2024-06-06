import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import connectMongoDB from "../../../../utils/mongoDB";
import UserSettings from "../../../../models/UserSettings";
import { NextResponse } from "next/server";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req) {
  try {
    const { messages } = await req.json();
    await connectMongoDB();
    const settings = await UserSettings.findOne();

    const response = await openai.createChatCompletion({
      model: settings?.model || "gpt-3.5-turbo",
      max_tokens: settings?.outputLength || 512,
      temperature: settings?.temperature || 0.7,
      messages,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse.json(
      { error: error.message },
      {
        status: 400,
      }
    );
  }
}
