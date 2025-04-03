import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (storedToken) {
      setToken(storedToken);
      fetchUserRole(storedToken);
    }
  }, []);

  const fetchUserRole = async (storedToken) => {
    try {
      const response = await fetch("http://localhost:3000/api/token/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(token),

      });

      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }

      const data = await response.json();
      setUserRole(data.role); // Assuming the API returns the user's role in `data.role`
    } catch (error) {
      console.error("Error fetching user role:", error.message);
      setToken(null); // Clear token if there's an error
      localStorage.removeItem("token");
    }
  };

  return (
    <header id='header'>
      <Link href='/'>
        <img src='/assets/Images/Helldivers_2_logo.webp' className='logo' alt='Logo Helldivers 2' />
      </Link>

      <nav>
        <ul id='headerMenu' className='navbar'>
          <li>
            <Link href='/'>Accueil</Link>
          </li>
          <li>
            <Link href='/forum'>Forums</Link>
          </li>

          {token ? (
            <>
              {admin === "admin" && (
                <li>
                  <Link href='/admin'>Admin</Link>
                </li>
              )}
              <li>
                <Link href='/logout' id='logout'>
                  Déconnexion
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href='/login'>Se connecter</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );

}