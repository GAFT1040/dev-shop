import { LoginUserData, RegisterUserData } from "@/types/auth";
import api from "./api";

export const registerUserService = async (data: RegisterUserData) => {
  const response = await api.post("register", data);
  return response.data;
};

export const loginUserService = async (data: LoginUserData) => {
  const response = await api.post("login", data);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`users/${id}`);
  return response.data;
};
