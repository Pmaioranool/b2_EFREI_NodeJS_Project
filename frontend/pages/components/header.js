import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./userContext";

export default function Header() {
  const { token, admin } = useContext(UserContext);

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
<<<<<<< HEAD
<<<<<<< HEAD
                <Link href='/logout'>Déconnexion</Link>
=======
                <Link href='/logout' id='logout'>
                  Déconnexion
                </Link>
>>>>>>> 876259d (FIX déconnexion relaod)
=======
                <Link href='/logout' id='logout'>
                  Déconnexion
                </Link>
>>>>>>> 95bdf27 (refactor: clean up header component by removing unused context and resolving merge conflicts)
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