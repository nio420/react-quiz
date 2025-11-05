import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // ✅ If logged in, show the protected page
  // ❌ If not, redirect to login
  return currentUser ? children : <Navigate to="/login" replace />;
}
