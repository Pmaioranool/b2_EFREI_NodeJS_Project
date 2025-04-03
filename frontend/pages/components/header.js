import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./userContext";

export default function Header() {
  const { token, role } = useContext(UserContext);

  const adminNumber = 1;

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
              {role == adminNumber && (
                <li>
                  <Link href='/admin'>Admin</Link>
                </li>
              )}
              <li>
                <Link href='/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Link href='/logout'>Déconnexion</Link>
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
