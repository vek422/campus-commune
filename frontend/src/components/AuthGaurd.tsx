import { useAppSelector } from "@/store/store";
import { Navigate } from "react-router-dom";
export default function AuthGaurd({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
export const withAuthGaurd = (Component: React.ComponentType) => {
  return () => {
    const { user } = useAppSelector((state) => state.auth);
    if (!user) {
      return <Navigate to={"/login"} />;
    }
    return <Component />;
  };
};
