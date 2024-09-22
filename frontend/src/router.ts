import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import App from "./App";
import Register from "./pages/auth/register";
import { withAuthGaurd } from "./components/AuthGaurd";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: withAuthGaurd(App),
  },
]);
