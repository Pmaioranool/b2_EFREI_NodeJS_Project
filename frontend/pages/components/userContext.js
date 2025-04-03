import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  // Lire le token et le rôle à chaque navigation
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      if (storedRole) {
        setRole(storedRole);
      } else {
        fetchUserRole(storedToken);
      }
    }
  }, [router.asPath]);

  const login = async (data) => {
    const newToken = typeof data === "string" ? data : data.token;
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      await fetchUserRole(newToken);
    }
  };

  const fetchUserRole = async (storedToken) => {
    try {
      const response = await fetch("http://localhost:3000/api/token/decrypt", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data && data.role) {
        setRole(data.role);
      }
      if (data && data.email) {
        setEmail(data.email);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ token, role, email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
