"use client";
import {
  AuthContextInterface,
  LoginUserData,
  RegisterUserData,
  User,
} from "@/types/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getUser,
  loginUserService,
  registerUserService,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/services/api";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoged, setIsLoged] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("@token");
    const userId = localStorage.getItem("@userId");

    const fetchData = async () => {
      if (token) {
        setIsLoged(true);
        api.defaults.headers.common["Authorization"] =
          `Bearer ${JSON.parse(token)}`;
      }
      if (userId) {
        try {
          const response = await getUser(Number(JSON.parse(userId)));
          setUser(response);
        } catch (error: any) {
          if (error.response.status === 401) {
            toast.error("Sessão expirada, faça login novamente");
            setUser(null);
            localStorage.clear();
          }
        }
      }
    };

    fetchData();
  }, []);

  const registerUser = async (data: RegisterUserData) => {
    try {
      await registerUserService(data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const loginUser = async (data: LoginUserData) => {
    try {
      const response = await loginUserService(data);
      localStorage.setItem("@token", JSON.stringify(response.accessToken));
      localStorage.setItem("@userId", JSON.stringify(response.user.id));
      setUser(response.user);
      setIsLoged(true);
      router.push("/");
      toast.success("Login bem sucedido!");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, user, isLoged }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
