import axiosInstance from "@/lib/axios";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export function register(data: RegisterData) {
  return axiosInstance<AuthResponse>({
    method: "POST",
    url: "/auth/register",
    data,
  });
}

export function login(data: LoginData) {
  return axiosInstance<AuthResponse>({
    method: "POST",
    url: "/auth/login",
    data,
  });
} 