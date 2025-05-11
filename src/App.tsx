import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <Toaster />

      <AuthProvider>
        <RouterProvider router={router} />;
      </AuthProvider>
    </>
  );
}

export default App;
