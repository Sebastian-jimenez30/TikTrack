import { messageUseCases } from "@/application/use-cases/message.use-case";
import { Message } from "@/domain/entities/message";

interface IndexProps {
  params: Promise<{ page?: string }>;
}

interface ShowProps {
  params: Promise<{ id: string }>;
}

interface CreateProps {
  params: Promise<{
    sender_id: number;
    receiver_id: number;
    content: string;
  }>;
}

class MessageController {
  async index({ params }: IndexProps): Promise<{
    messages: Message[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const { page } = await params;
    const pageNumber = page ? Number(page) : 1;
    const limit = 20;

    const pageData = await messageUseCases.list(pageNumber, limit);
    return pageData;
  }

  async show({ params }: ShowProps): Promise<{
    message: Message | null;
    haveResults: boolean;
  }> {
    const { id } = await params;
    const pageData = await messageUseCases.detail(Number(id));
    return pageData;
  }

  async create({ params }: CreateProps): Promise<Message> {
    const { sender_id, receiver_id, content } = await params;
    const message = await messageUseCases.create({
      sender_id,
      receiver_id,
      content,
    });
    return message;
  }
}

export const messageController = new MessageController(); 