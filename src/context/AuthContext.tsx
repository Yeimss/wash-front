import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { LoginResponse, User } from "../types/auth";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (document: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (document: string, password: string) => {
    try {
      const res = await api.post<LoginResponse>("/Auth/Login", { document, password });
      
      const tokenFromResp = res.data?.data?.token;
      const userFromResp = res.data?.data?.user as User | undefined;

      if (!tokenFromResp) {
        throw new Error("Respuesta inválida: token no presente");
      }

      await AsyncStorage.setItem(TOKEN_KEY, tokenFromResp);
      if (userFromResp) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userFromResp));
      }

      setToken(tokenFromResp);
      if (userFromResp) setUser(userFromResp);
    } catch (error: any) {
      if (error.response) {
        console.log("Data del servidor:", error.response.data);
        console.log("Status:", error.response.status);
      } else if (error.request) {
        console.log("Request que se envió pero no respondió:", error.request);
      } else {
        console.log("Mensaje de error:", error.message);
      }
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const checkToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const savedUser = await AsyncStorage.getItem(USER_KEY);
      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (err) {
      console.log("Error al cargar credenciales:", err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
