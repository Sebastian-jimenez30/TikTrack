import axios from "axios";
import type { IOpenAIService } from "@/application/services/openai.service.interface.ts";
import { getTranslations } from "next-intl/server";

export class OpenAIService implements IOpenAIService {
  async generateText(
    input: string,
    contextPrompt: string
  ): Promise<string | { error: string }> {
    const t = await getTranslations("OpenAIService");
    const OPENAI_API_URL = process.env.OPENAI_API_URL!;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
    const model = process.env.OPENAI_API_MODEL!;

    const messages = [
      { role: "system", content: contextPrompt },
      { role: "user", content: input },
    ];

    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model,
          messages,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data.choices?.[0]?.message?.content;
      if (!result) {
        return { error: t("error.noResponse") };
      }
      return result;
    } catch {
      return { error: t("error.general") };
    }
  }
}
