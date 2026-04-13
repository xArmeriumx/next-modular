import { UserDocument } from "../interfaces/user.interface";
import { UserDatabase } from "../interfaces/user.db.interface";
import * as argon2 from "argon2";


const MOCK_USERS: Map<string, UserDocument> = new Map();

const seedData = async () => {
  const defaultPassword = await argon2.hash("password123");

  MOCK_USERS.set("user-1", {
    id: "user-1",
    email: "test@example.com",
    name: "John Tester",
    role: "customer",
    hashedPassword: defaultPassword,
    createdAt: new Date()
  });

  MOCK_USERS.set("admin-1", {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin Supergod",
    role: "admin",
    hashedPassword: defaultPassword,
    createdAt: new Date()
  });
};

seedData();

export const memoryUserDB: UserDatabase = {
  findByEmail: async (email: string) => {
    return Array.from(MOCK_USERS.values()).find((u) => u.email === email) || null;
  },

  findById: async (id: string) => {
    return MOCK_USERS.get(id) || null;
  },

  update: async (id: string, data: Partial<UserDocument>) => {
    const user = MOCK_USERS.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...data };
    MOCK_USERS.set(id, updatedUser);
    return updatedUser;
  }
};
