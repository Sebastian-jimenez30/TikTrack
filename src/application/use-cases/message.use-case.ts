import { Message } from "@/domain/entities/message";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import repositoryContainer from "~/containers/repository.container";

export class MessageUseCases {
  async listByUser(user_id: number): Promise<{ messages: Message[] }> {
    const repository =
      repositoryContainer.get<IMessageRepository>("IMessageRepository");
    const tempMessages = await repository.listByUser(user_id);

    const messages = tempMessages.map((message) => {
      return new Message(
        message.id,
        message.content,
        message.created_at,
        message.updated_at,
        message.user_id
      );
    });

    return { messages };
  }

  async create(data: { content: string; user_id: number }): Promise<Message> {
    const repository =
      repositoryContainer.get<IMessageRepository>("IMessageRepository");

    const tempMessage = await repository.create(data);

    return new Message(
      tempMessage.id,
      tempMessage.content,
      tempMessage.created_at,
      tempMessage.updated_at,
      tempMessage.user_id
    );
  }

  async update(id: number, content: string): Promise<Message | null> {
    const repository =
      repositoryContainer.get<IMessageRepository>("IMessageRepository");

    const updatedMessage = await repository.update(id, content);

    if (!updatedMessage) return null;

    return new Message(
      updatedMessage.id,
      updatedMessage.content,
      updatedMessage.created_at,
      updatedMessage.updated_at,
      updatedMessage.user_id
    );
  }

  async delete(id: number): Promise<void> {
    const repository =
      repositoryContainer.get<IMessageRepository>("IMessageRepository");
    await repository.delete(id);
  }
}

export const messageUseCases = new MessageUseCases();
