import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "./userContext";

export default function withAuth(Component, { requireAdmin = false } = {}) {
  return function ProtectedComponent(props) {
    const { token, role } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      if (!token || token === null) {
        console.log("Token not found, redirecting to login");
        router.replace("/login");
        return;
      }

      try {
        // Décoder le token pour vérifier son expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Temps actuel en secondes
        if (decodedToken.exp < currentTime) {
          console.log("Token expired, redirecting to login");
          router.replace("/login");
          return;
        }
      } catch (err) {
        console.log("Error decoding token:", err.message);
        router.replace("/login");
        return;
      }

      if (requireAdmin && role != 1) {
        console.log("Admin role required, redirecting to home");
        router.replace("/");
        return;
      }
    }, [token, role, router]);

    if (token === null || (requireAdmin && role === null)) {
      return null;
    }

    if (requireAdmin && role != 1) {
      return null;
    }

    return <Component {...props} />;
  };
}
