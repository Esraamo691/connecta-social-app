import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoutes";
import AuthContextProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
