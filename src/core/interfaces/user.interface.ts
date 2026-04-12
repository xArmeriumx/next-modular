export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface UserDocument extends User {
  hashedPassword?: string;
  createdAt?: Date;
}
