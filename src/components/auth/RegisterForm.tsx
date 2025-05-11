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
import { register } from "@/services/auth";
import { toast } from "sonner";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  email: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
    .required("La confirmación de contraseña es requerida"),
});

export function RegisterForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);

      console.log(data);

      const obj = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await register(obj);
      toast.success("Cuenta creada correctamente");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl font-bold text-white mb-2">
          Crear cuenta
        </CardTitle>

        <CardDescription className="text-lg text-gray-300 mb-4">
          Regístrate para comenzar a gestionar tus tareas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-white">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre"
                      autoComplete="name"
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
                      autoComplete="new-password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-white">
                    Confirmar contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      autoComplete="new-password"
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
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-300">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-white underline hover:text-gray-300"
          >
            Inicia sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
