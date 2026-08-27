import type { User } from "../types/auth";
import api from "./axios";



interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>(
    "/auth/me"
  );

  return response.data;
};


export interface RegisterPayload {
  companyName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    companyId: string;
    companyName: string;
    email: string;
  };
}

export const registerCompany = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    payload
  );

  return response.data;
};

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  username: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> => {
  const response = await api.patch<UpdateProfileResponse>(
    "/auth/profile",
    payload
  );

  return response.data;
};