// components/Header.js
import Link from "next/link";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const adminToken =
  typeof window !== "undefined" ? localStorage.getItem("admin") : null;

export default function Header({ user, userRole }) {
  return (
    <header id="header">
      <Link href="/">
        <img
          src="/assets/Images/Helldivers_2_logo.webp"
          className="logo"
          alt="Logo Helldivers 2"
        />
      </Link>

      <nav>
        <ul id="headerMenu" className="navbar">
          <li>
            <Link href="/">Accueil</Link>
          </li>

          <li>
            <Link href="/forum">Forums</Link>
          </li>
          {token ? (
            <>
              {adminToken === "admin" && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/logout" id="logout">
                  Déconnexion
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Se connecter</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
