import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Error from "./pages/Error";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./store/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
