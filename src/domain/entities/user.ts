export class User {
    constructor(
      public id: number,
      public email: string,
      public password: string,
      public name: string,
      public role: "admin" | "user",
      public status: "active" | "inactive",
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  
    // Getters
    getId(): number {
      return this.id;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    getName(): string {
      return this.name;
    }
  
    getRole(): "admin" | "user" {
      return this.role;
    }
  
    getStatus(): "active" | "inactive" {
      return this.status;
    }
  
    getCreatedAt(): Date {
      return this.createdAt;
    }
  
    getUpdatedAt(): Date {
      return this.updatedAt;
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
  
    setRole(role: "admin" | "user"): void {
      this.role = role;
    }
  
    setStatus(status: "active" | "inactive"): void {
      this.status = status;
    }
  
    isValidEmail(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }
  
    isPasswordStrong(): boolean {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(this.password);
    }
  }