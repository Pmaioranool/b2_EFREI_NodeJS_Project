import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/userContext";

export default function PublicationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [publication, setPublication] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  // Charger la publication et l'utilisateur
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/publications/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Publication non trouvée");
          return res.json();
        })
        .then((data) => {
          setPublication(data);
          if (data.user_id) {
            return fetch(`http://localhost:3000/api/users/${data.user_id}`);
          }
          return null;
        })
        .then((userRes) => userRes?.json())
        .then((userData) => setUser(userData))
        .catch((err) => {
          console.error("Erreur:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Charger les commentaires
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/comments/publication/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de chargement des commentaires");
          return res.json();
        })
        .then((data) => {
          setComments(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const { email } = useContext(UserContext);

  const userId = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/email/${email}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération de l'ID utilisateur");
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error("Erreur:", error);
      return null;
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      router.push("/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    try {
      // Récupérer l'ID utilisateur de manière asynchrone
      const user_id = await userId(email);

      if (!user_id) {
        setError("Impossible de récupérer l'ID utilisateur.");
        return;
      }

      // Vérifier si le contenu du commentaire est vide
      if (!commentContent.trim()) {
        setError("Le commentaire ne peut pas être vide.");
        return;
      }

      // Envoyer le commentaire au backend
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publication_id: id, // ID de la publication
          content: commentContent, // Contenu du commentaire
          user_id: user_id, // ID de l'utilisateur
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du commentaire");
      }

      const newComment = await response.json();

      // Ajouter le nouveau commentaire à la liste existante
      setComments((prev) => [newComment, ...prev]);
      setCommentContent(""); // Réinitialiser le champ de texte
      setError(null); // Réinitialiser les erreurs
    } catch (err) {
      console.error("Erreur :", err);
      setError(err.message); // Afficher l'erreur
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>{error}</p>
        <a href="/forum" className="back-button">
          Retour au forum
        </a>
      </div>
    );

  if (!publication)
    return (
      <div className="not-found-container">
        <h2>Publication introuvable</h2>
        <a href="/forum" className="back-button">
          Retour au forum
        </a>
      </div>
    );

  return (
    <div className="publication-detail">
      <article className="publication-main">
        <h1 className="publication-title">{publication.title}</h1>

        <div className="publication-meta">
          <span className="content">{publication.content}</span>
          <span className="author">Par {user?.username || "Anonyme"}</span>
          <span className="date">
            Publié le {new Date(publication.creation_date).toLocaleDateString()}
          </span>
          {publication.update_date && (
            <span className="date">
              Modifié le{" "}
              {new Date(publication.update_date).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="publication-content">
          <p>{publication.content}</p>
        </div>
      </article>
      {user && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Ajouter un commentaire..."
            required
          />
          <button type="submit" className="submit-button">
            Publier
          </button>
        </form>
      )}
      <section className="comments-section">
        <h2>Commentaires ({comments.length})</h2>

        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.username}</span>
                  <span className="comment-date">
                    {new Date(comment.update_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">Aucun commentaire pour le moment</p>
        )}
      </section>
    </div>
  );
}
