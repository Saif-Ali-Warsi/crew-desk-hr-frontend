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