import { Outlet } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import type { JSX } from "react";

export function AuthLayout(): JSX.Element {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Columna izquierda - Info */}
      <div className="hidden md:flex flex-col justify-center p-8 bg-white text-primary-foreground">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-5xl font-bold mb-4 text-primary">TaskMaster</h1>

          <p className="text-2xl mb-10 text-gray-700">
            La forma más sencilla de organizar tus tareas diarias
          </p>

          <ul className="space-y-5 text-lg">
            <li className="flex items-center gap-3 text-primary">
              <CheckCircle className="text-primary w-6 h-6" />
              Crea listas personalizadas
            </li>

            <li className="flex items-center gap-3 text-primary">
              <CheckCircle className="text-primary w-6 h-6" />
              Organiza tus tareas por prioridad
            </li>

            <li className="flex items-center gap-3 text-primary">
              <CheckCircle className="text-primary w-6 h-6" />
              Accede desde cualquier dispositivo
            </li>

            <li className="flex items-center gap-3 text-primary">
              <CheckCircle className="text-primary w-6 h-6" />
              Interfaz intuitiva y fácil de usar
            </li>
          </ul>
        </div>
      </div>

      {/* Columna derecha - Formulario */}
      <div className="flex items-center justify-center p-4 bg-gray-900 text-gray-50 min-h-screen">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
