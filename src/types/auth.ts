export type UserRole =
  | "SUPER_ADMIN"
  | "COMPANY_ADMIN"
  | "HR"
  | "ASSOCIATE_HR"
  | "JUNIOR_HR";

export type UserLanguage = "EN" | "AR";

export type UserDirection = "LTR" | "RTL";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId: string;

  username?: string;
  firstName?: string;
  lastName?: string;

  language: "EN" | "AR";
  direction: "LTR" | "RTL";
  

  company?: {
    id: string;
    name: string;
    logo?: string | null;
  };
}