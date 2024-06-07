import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      messages,
      model,
      outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
      Key,
    } = await req.json();

    const config = new Configuration({
      apiKey: Key,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      max_tokens: outputLength || 512,
      temperature: temperature || 0.7,
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
