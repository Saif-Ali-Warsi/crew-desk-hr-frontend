export type UserRole =
  | "SUPER_ADMIN"
  | "COMPANY_ADMIN"
  | "HR"
  | "ASSOCIATE_HR"
  | "JUNIOR_HR";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId: string;
  username?: string;
}