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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (document: string, password: string) => {
    console.info(`Trying auth: `);
    console.log({ document, password })
    try {
        const res = await api.post<LoginResponse>("/Auth/Login", { document, password });
        console.log("Respuesta completa:", res);
        await AsyncStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    } catch (error: any) {
        if (error.response) {
            console.log("Data del servidor:", error.response.data);
            console.log("Status:", error.response.status);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            console.log("Request que se envió pero no respondió:", error.request);
        } else {
            console.log("Mensaje de error:", error.message);
        }
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const checkToken = async () => {
    const savedToken = await AsyncStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
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
