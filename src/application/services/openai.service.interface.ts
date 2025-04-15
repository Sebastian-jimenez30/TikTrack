export interface IOpenAIService {
  generateText(
    input: string,
    model: string
  ): Promise<string | { error: string }>;
}
