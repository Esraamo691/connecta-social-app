import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoutes";
import AuthContextProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default App;
