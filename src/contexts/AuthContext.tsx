import React, { createContext, useState, useEffect, useContext } from "react";
import {
  login as loginService,
  register as registerService,
} from "@/services/auth";
import { toast } from "sonner";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      setToken(token);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error al iniciar sesión");
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerService({ name, email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      setToken(token);
      toast.success("Registro exitoso");
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Error al registrarse");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    toast.success("Sesión cerrada exitosamente");

    setTimeout(() => {
      location.href = "/login";
    }, 2000);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
