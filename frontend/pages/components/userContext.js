import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");

    if (storedToken) setToken(storedToken);
    if (storedAdmin) setAdmin(storedAdmin);
  }, []);

  const login = (newToken, isAdmin = null) => {
    localStorage.setItem("token", newToken);
    if (isAdmin) {
      localStorage.setItem("admin", isAdmin);
      setAdmin(isAdmin);
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  };

  return (
    <UserContext.Provider value={{ token, admin, login, logout }}>{children}</UserContext.Provider>
  );
}
