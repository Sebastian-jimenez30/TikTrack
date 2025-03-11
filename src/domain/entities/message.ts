class Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    sender_id: number,
    receiver_id: number,
    content: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  getId(): number {
    return this.id;
  }

  getSenderId(): number {
    return this.sender_id;
  }

  getReceiverId(): number {
    return this.receiver_id;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getUpdatedAt(): Date {
    return this.updated_at;
  }

  setId(id: number): void {
    this.id = id;
  }

  setSenderId(sender_id: number): void {
    this.sender_id = sender_id;
  }

  setReceiverId(receiver_id: number): void {
    this.receiver_id = receiver_id;
  }

  setContent(content: string): void {
    this.content = content;
  }

  setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }

  setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }
}

export { Message };
