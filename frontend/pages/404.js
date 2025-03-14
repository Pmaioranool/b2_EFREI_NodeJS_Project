// pages/404.js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
    const router = useRouter();
    const currentUrl = router.asPath; // Récupère l'URL actuelle

    // Fonction pour tronquer le chemin de l'URL
    const truncatePath = (path, maxLength) => {
        if (path.length > maxLength) {
            const segments = path.split('/').filter(segment => segment.length > 0);
            const lastSegment = segments[segments.length - 1];
            const truncatedPath = path.substring(0, maxLength - lastSegment.length - 3) + '...';
            return truncatedPath;
        }
        return path;
    };

    const truncatedPath = truncatePath(currentUrl, 20); // Tronque l'URL si nécessaire

    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/stylesheets/style.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
                <title>DiversHelper - 404 Page Not Found</title>
            </Head>
            <body className="centered-404">
                <section className="container-404">
                    <h1>
                        <i className="fa-solid fa-triangle-exclamation rouge"></i> Nouveau message reçu{' '}
                        <i className="fa-solid fa-triangle-exclamation rouge"></i>
                    </h1>
                    <div className="message-404">
                        <h2>Erreur 404 : Page non trouvée</h2>
                        <div className="url-404">Page recherchée : {truncatedPath}</div>
                        <p>
                            Nous sommes désolés mais la page que vous recherchez n'existe pas. Veuillez vérifier l'URL ou consulter notre{' '}
                            <Link href="/">accueil</Link>.
                        </p>
                    </div>
                </section>
            </body>
        </>
    );
}