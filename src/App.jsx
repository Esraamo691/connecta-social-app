import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoutes";
import AuthContextProvider from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
