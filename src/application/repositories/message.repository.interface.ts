export default interface IMessageRepository {
  listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<{
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }[]>;
  
  findById(id: number): Promise<{
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  } | null>;

  create(message: {
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
  }>;

  count(): Promise<number>;
} 