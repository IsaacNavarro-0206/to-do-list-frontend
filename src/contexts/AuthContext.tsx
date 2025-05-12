import React, { createContext, useState, useContext, useEffect } from "react";

import { toast } from "sonner";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    // Inicializar el token desde localStorage
    return localStorage.getItem("token");
  });

  useEffect(() => {
    // Sincronizar el token con localStorage cuando cambie
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    toast.success("Sesión cerrada exitosamente");
    setToken(null);
    location.href = "/login";
  };

  const value = {
    token,
    isAuthenticated: !!token,
    logout,
    setToken,
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
