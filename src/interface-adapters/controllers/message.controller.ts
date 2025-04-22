import { messageUseCases } from "@/application/use-cases/message.use-case";
import { Message } from "@/domain/entities/message";

interface ShowProps {
  params: { id: number };
}

interface CreateProps {
  params: { content: string };
}

interface UpdateProps {
  params: { id: number; content: string };
}

class MessageController {
  async index(): Promise<{ pageData: { messages: Message[] } }> {
    const data = await messageUseCases.listAll();
    return { pageData: data };
  } 

  async create({ params }: CreateProps): Promise<Message> {
    const { content } = params;
    const message = await messageUseCases.create({ content });
    return message;
  }

  async update({ params }: UpdateProps): Promise<Message | null> {
    const { id, content } = params;
    const message = await messageUseCases.update(Number(id), content);
    return message;
  }

  async delete({ params }: ShowProps): Promise<void> {
    const { id } = params;
    await messageUseCases.delete(Number(id));
  }
}

export const messageController = new MessageController();
