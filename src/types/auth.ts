export type UserRole =
  | "SUPER_ADMIN"
  | "COMPANY_ADMIN"
  | "HR"
  | "ASSOCIATE_HR"
  | "JUNIOR_HR";

export interface UserCompany {
  id: string;
  name: string;
  logo?: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string | null;
  email: string;
  role: UserRole;
  companyId?: string | null;
  isActive: boolean;
  company?: UserCompany | null;
}