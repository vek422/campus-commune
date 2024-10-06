import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { withAuthGaurd } from "./components/AuthGaurd";
import Home from "./pages/Home";
import Commune from "./pages/Commune/Commune";
import CreateCommune from "./pages/Commune/CreateCommune";

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
    Component: withAuthGaurd(Home),
  },
  {
    path: "/commune/:communeId",
    Component: withAuthGaurd(Commune)
  },
  {
    path: "/create-commune",
    Component: withAuthGaurd(CreateCommune),
  }
]);
