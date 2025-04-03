// pages/404.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Custom404() {
  const router = useRouter();
  const [truncatedPath, setTruncatedPath] = useState("");

  // Fonction pour tronquer le chemin de l'URL
  const truncatePath = (path, maxLength) => {
    if (path.length > maxLength) {
      const segments = path.split("/").filter((segment) => segment.length > 0);
      const lastSegment = segments[segments.length - 1];
      return path.substring(0, maxLength - lastSegment.length - 3) + "...";
    }
    return path;
  };

  // Utilisation de useEffect pour éviter le problème SSR
  useEffect(() => {
    if (router && router.asPath) {
      setTruncatedPath(truncatePath(router.asPath, 20));
    }
  }, [router]);

  return (
    <article className="centered-404">
      <section className="container-404">
        <h1>
          <i className="fa-solid fa-triangle-exclamation rouge"></i> Nouveau
          message reçu{" "}
          <i className="fa-solid fa-triangle-exclamation rouge"></i>
        </h1>
        <div className="message-404">
          <h2>Erreur 404 : Page non trouvée</h2>
          <div className="url-404">Page recherchée : {truncatedPath}</div>
          <p>
            Nous sommes désolés mais la page que vous recherchez n'existe pas.
            Veuillez vérifier l'URL ou consulter notre{" "}
            <Link href="/">accueil</Link>.
          </p>
        </div>
      </section>
    </article>
  );
}
