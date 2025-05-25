import { eq } from "drizzle-orm";
import { messagesTable } from "@/infrastructure/database/schemas/message.schema";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import db from "@/infrastructure/database/index";
import { asc } from "drizzle-orm";

export default class MessageRepository implements IMessageRepository {
  async listAll(): Promise<
    {
      id: number;
      content: string;
      created_at: Date;
      updated_at: Date;
    }[]
  > {
    return await db.select().from(messagesTable).orderBy(asc(messagesTable.id));
  }

  async create(message: { content: string }): Promise<{
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }> {
    const response = await db.insert(messagesTable).values(message).returning();
    return response[0];
  }

  async update(
    id: number,
    content: string
  ): Promise<{
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const response = await db
      .update(messagesTable)
      .set({ content })
      .where(eq(messagesTable.id, id))
      .returning();

    return response.length ? response[0] : null;
  }

  async delete(id: number): Promise<void> {
    await db.delete(messagesTable).where(eq(messagesTable.id, id));
  }
}
