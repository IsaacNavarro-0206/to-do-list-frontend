import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/services/auth";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

export function LoginForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      setIsLoading(true);

      const res = await login(data);
      setToken(res.data.token);

      toast.success("Inicio de sesión exitoso");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl font-bold text-white mb-2">
          Iniciar sesión
        </CardTitle>

        <CardDescription className="text-lg text-gray-300 mb-4">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-white">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@ejemplo.com"
                      autoComplete="email"
                      className="text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-white">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      autoComplete="current-password"
                      className="text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-base font-semibold bg-white text-gray-900 hover:bg-gray-200"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-300">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-white underline hover:text-gray-300"
          >
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
