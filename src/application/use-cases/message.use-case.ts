import { Message } from "@/domain/entities/message";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import repositoryContainer from "~/containers/repository.container";

export class MessageUseCases {
  async listAll(): Promise<{ messages: Message[] }> {
    const repository = repositoryContainer.get<IMessageRepository>("IMessageRepository");
    const tempMessages = await repository.listAll();

    const messages = tempMessages.map((message) => {
      return new Message(
        message.id,
        message.content,
        message.created_at,
        message.updated_at
      );
    });

    return { messages };
  }

  async create(data: { content: string }): Promise<Message> {
    const repository = repositoryContainer.get<IMessageRepository>("IMessageRepository");
    
    const tempMessage = await repository.create(data);
    
    return new Message(
      tempMessage.id,
      tempMessage.content,
      tempMessage.created_at,
      tempMessage.updated_at
    );
  }

  async update(id: number, data: { content: string }): Promise<Message | null> {
    const repository = repositoryContainer.get<IMessageRepository>("IMessageRepository");
    
    const updatedMessage = await repository.update(id, data);
    
    if (!updatedMessage) return null;

    return new Message(
      updatedMessage.id,
      updatedMessage.content,
      updatedMessage.created_at,
      updatedMessage.updated_at
    );
  }

  async delete(id: number): Promise<void> {
    const repository = repositoryContainer.get<IMessageRepository>("IMessageRepository");
    await repository.delete(id);
  }
}

export const messageUseCases = new MessageUseCases();