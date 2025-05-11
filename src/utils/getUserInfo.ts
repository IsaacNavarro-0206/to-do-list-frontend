import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

export const getUserInfo = (): User | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  const decoded = jwtDecode<JwtPayload>(token);
  return {
    id: decoded.sub,
    email: decoded.email,
    name: decoded.name,
  };
};
