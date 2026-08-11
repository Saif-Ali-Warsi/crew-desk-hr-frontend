export type UserRole = "COMPANY_ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId: string;
}