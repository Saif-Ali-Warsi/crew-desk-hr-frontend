import type { User, UserRole } from "../types/auth";

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

export const getCurrentRole = (): UserRole | null => {
  return getCurrentUser()?.role ?? null;
};

export const hasRole = (...roles: UserRole[]): boolean => {
  const role = getCurrentRole();

  return role ? roles.includes(role) : false;
};