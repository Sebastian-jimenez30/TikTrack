export default interface IMessageRepository {
  listAll(): Promise<
    {
      id: number;
      content: string;
      created_at: Date;
      updated_at: Date;
    }[]
  >;

  create(message: { content: string }): Promise<{
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }>;

  update(
    id: number,
    content: string
  ): Promise<{
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  } | null>;

  delete(id: number): Promise<void>;
}
