import { UserDocument } from "./user.interface";

export interface UserDatabase {
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
}
