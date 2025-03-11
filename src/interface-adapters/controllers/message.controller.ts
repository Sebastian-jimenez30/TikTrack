import { messageUseCases } from "@/application/use-cases/message.use-case";
import { Message } from "@/domain/entities/message";

interface IndexProps {
  params: { page?: string };
}

interface ShowProps {
  params: { id: string };
}

interface CreateProps {
  params: { content: string };
}

interface UpdateProps {
  params: { id: string; content: string };
}

class MessageController {
  async index(): Promise<{ messages: Message[] }> {
    const messages = await messageUseCases.listAll();
    return messages;
  }

  async create({ params }: CreateProps): Promise<Message> {
    const { content } = params;
    const message = await messageUseCases.create({ content });
    return message;
  }

  async update({ params }: UpdateProps): Promise<Message | null> {
    const { id, content } = params;
    const message = await messageUseCases.update(Number(id), { content });
    return message;
  }

  async delete({ params }: ShowProps): Promise<void> {
    const { id } = params;
    await messageUseCases.delete(Number(id));
  }
}

export const messageController = new MessageController();