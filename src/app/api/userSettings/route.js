// pages/api/userSettings.js

import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import UserSettings from "../../../../models/UserSettings";

export async function POST(req) {
  try {
    const { model, outputLength, temperature, topP, topK, repetitionPenalty } =
      await req.json();

    await connectMongoDB();

    const settings = await UserSettings.findOne();
    if (settings) {
      await UserSettings.updateOne(
        {},
        { model, outputLength, temperature, topP, topK, repetitionPenalty }
      );
    } else {
      await UserSettings.create({
        model,
        outputLength,
        temperature,
        topP,
        topK,
        repetitionPenalty,
      });
    }

    return NextResponse.json({ message: "Settings saved" }, { status: 200 });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const settings = await UserSettings.findOne();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
