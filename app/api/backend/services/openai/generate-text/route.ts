import { NextRequest, NextResponse } from "next/server";
import { IOpenAIService } from "@/application/services/openai.service.interface";
import serviceContainer from "~/containers/service.container";
import PROMPTS from "~/constants/prompts";

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const contextPrompt = PROMPTS.IMPROVE_TEXT;

  const service = serviceContainer.get<IOpenAIService>("IOpenAIService");
  const response = await service.generateText(input, contextPrompt);
  return NextResponse.json(response);
}
