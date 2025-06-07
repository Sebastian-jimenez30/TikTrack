class Message {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;

  constructor(
    id: number,
    content: string,
    created_at: Date,
    updated_at: Date,
    user_id: number
  ) {
    this.id = id;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
  }

  getId(): number {
    return this.id;
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

  getUserId(): number {
    return this.user_id;
  }

  setId(id: number): void {
    this.id = id;
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

  setUserId(user_id: number): void {
    this.user_id = user_id;
  }
}

export { Message };
