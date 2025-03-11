import { count } from "drizzle-orm";
import { eq } from "drizzle-orm";

import { messagesTable } from "@/infrastructure/database/schemas/message.schema";
import IMessageRepository from "@/application/repositories/message.repository.interface";
import db from "@/infrastructure/database/index";

export default class MessageRepository implements IMessageRepository {
  async listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<{
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }[]> {
    const offset = (pageNumber - 1) * limit;
    const response = await db
      .select()
      .from(messagesTable)
      .limit(limit)
      .offset(offset);
    return response;
  }

  async findById(id: number): Promise<{
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const response = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.id, id));
    return response.length > 0 ? response[0] : null;
  }

  async create(message: {
    sender_id: number;
    receiver_id: number;
    content: string;
  }): Promise<{
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }> {
    const response = await db
      .insert(messagesTable)
      .values(message)
      .returning();
    return response[0];
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(messagesTable);
    return response[0].count;
  }
} 