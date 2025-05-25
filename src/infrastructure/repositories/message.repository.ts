import { eq } from "drizzle-orm";
import { messagesTable } from "@/infrastructure/database/schemas/message.schema";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import db from "@/infrastructure/database/index";
import { asc } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";

export default class MessageRepository implements IMessageRepository {
  async listByUser(user_id: number): Promise<
    {
      id: number;
      content: string;
      created_at: Date;
      updated_at: Date;
      user_id: number;
    }[]
  > {
    return await db
      .select({
        id: messagesTable.id,
        content: messagesTable.content,
        created_at: messagesTable.created_at,
        updated_at: messagesTable.updated_at,
        user_id: messagesTable.user_id,
      })
      .from(messagesTable)
      .where(eq(messagesTable.user_id, user_id))
      .orderBy(asc(messagesTable.id));
  }

  async create(message: { content: string; user_id: number }): Promise<{
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
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
    user_id: number;
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
