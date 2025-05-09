import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <header>
        {/* Aquí puedes agregar una barra de navegación o encabezado común */}
        <nav>
          <a href="/login">Login</a> | <a href="/register">Register</a> | <a href="/dashboard">Dashboard</a>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </main>
      <footer>
        {/* Aquí puedes agregar un pie de página común */}
        <p>© 2024 To-Do App</p>
      </footer>
    </div>
  );
}