import { UserDocument } from "./user.interface";

export interface UserDatabase {
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  update(id: string, data: Partial<UserDocument>): Promise<UserDocument | null>;
}
