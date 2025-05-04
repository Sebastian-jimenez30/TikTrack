export type Status = "active" | "inactive";
export type Role = "admin" | "user";

class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public role: Role,
    public status: Status,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getRole(): Role {
    return this.role;
  }

  getStatus(): Status {
    return this.status;
  }

  getCreatedAt(): string {
    return this.createdAt.toLocaleDateString();
  }

  getUpdatedAt(): string {
    return this.updatedAt.toLocaleDateString();
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setName(name: string): void {
    this.name = name;
  }

  setRole(role: Role): void {
    this.role = role;
  }

  setStatus(status: Status): void {
    this.status = status;
  }
}

export { User };
