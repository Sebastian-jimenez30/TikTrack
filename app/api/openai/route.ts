import { NextRequest, NextResponse } from "next/server";
import { OpenAIService } from "@/infrastructure/services/openai.service";
import PROMPTS from "~/constants/prompts";
export async function POST(req: NextRequest) {
    const { input } = await req.json();
    const contextPrompt = PROMPTS.IMPROVE_TEXT;

    const openaiService = new OpenAIService();

    const response = await openaiService.generateText(input, contextPrompt);
    return NextResponse.json(response);
}