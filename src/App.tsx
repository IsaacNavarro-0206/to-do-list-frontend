import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ListsProvider } from "./contexts/ListsContext";

function App() {
  return (
    <>
      <Toaster />

      <AuthProvider>
        <ListsProvider>
          <RouterProvider router={router} />
        </ListsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
