export type UserRole = "user" | "admin" | "super-admin" | "business-manager";

export default interface Iuser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  avatar?: string;
  summary?: string;
}

