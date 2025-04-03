import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PublicationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [publication, setPublication] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState({});

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

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/comments/publication/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de chargement des commentaires");
          return res.json();
        })
        .then((data) => {
          setComments((prev) => ({ ...prev, [id]: data }));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    fetch(`http://localhost:3000/api/publications/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: commentContent,
        user_id: user?.id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout du commentaire");
        return res.json();
      })
      .then((newComment) => {
        setPublication((prev) => ({
          ...prev,
          comments: [...prev.comments, newComment],
        }));
        setCommentContent("");
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setError("Impossible d'ajouter le commentaire");
      });
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

      <section className="comments-section">
        <h2>Commentaires ({publication.comments?.length || 0})</h2>

        {publication.comments?.length > 0 ? (
          <div className="comments-list">
            {publication.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.username}</span>
                  <span className="comment-date">
                    {new Date(comment.creation_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">Aucun commentaire pour le moment</p>
        )}

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
      </section>
    </div>
  );
}
