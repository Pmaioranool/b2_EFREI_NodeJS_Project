// components/Header.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [token, setToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setAdminToken(localStorage.getItem("admin"));
    }
  }, []);

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
              {adminToken === "admin" && (
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
