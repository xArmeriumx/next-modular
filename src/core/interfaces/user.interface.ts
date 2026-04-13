export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string; // รูปโปรไฟล์ (Base64 หรือ URL)
}

export interface UserDocument extends User {
  hashedPassword?: string;
  createdAt?: Date;
}
