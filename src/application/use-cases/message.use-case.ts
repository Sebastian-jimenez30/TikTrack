import { Message } from "@/domain/entities/message";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";

export class MessageUseCases {
  async list(
    pageNumber: number,
    limit: number
  ): Promise<{
    messages: Message[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IMessageRepository>(
      "IMessageRepository"
    );
    const tempMessages = await repository.listPaginated(pageNumber, limit);
    const tempCount = await repository.count();

    const messages = tempMessages.map((message) => {
      return new Message(
        message.id,
        message.sender_id,
        message.receiver_id,
        message.content,
        message.created_at,
        message.updated_at
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      messages,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async detail(id: number): Promise<{ message: Message | null; haveResults: boolean }> {
    const repository = repositoryContainer.get<IMessageRepository>(
      "IMessageRepository"
    );
    const tempMessage = await repository.findById(id);
    
    if (!tempMessage) {
      return {
        message: null,
        haveResults: false,
      };
    }

    const message = new Message(
      tempMessage.id,
      tempMessage.sender_id,
      tempMessage.receiver_id,
      tempMessage.content,
      tempMessage.created_at,
      tempMessage.updated_at
    );

    return {
      message,
      haveResults: true,
    };
  }

  async create(data: {
    sender_id: number;
    receiver_id: number;
    content: string;
  }): Promise<Message> {
    const repository = repositoryContainer.get<IMessageRepository>(
      "IMessageRepository"
    );
    
    const tempMessage = await repository.create(data);
    
    return new Message(
      tempMessage.id,
      tempMessage.sender_id,
      tempMessage.receiver_id,
      tempMessage.content,
      tempMessage.created_at,
      tempMessage.updated_at
    );
  }
}

export const messageUseCases = new MessageUseCases(); 