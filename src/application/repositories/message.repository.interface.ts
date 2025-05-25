export default interface IMessageRepository {
  listByUser(user_id: number): Promise<
    {
      id: number;
      user_id: number;
      content: string;
      created_at: Date;
      updated_at: Date;
    }[]
  >;

  create(message: { content: string; user_id: number }): Promise<{
    id: number;
    user_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }>;

  update(
    id: number,
    content: string
  ): Promise<{
    id: number;
    user_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  } | null>;

  delete(id: number): Promise<void>;
}
