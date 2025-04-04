import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./components/userContext";

const Forum = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [publications, setPublications] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publiContent, setPubliContent] = useState("");
  const [title, setTitle] = useState("");
  const [publication, setPublication] = useState([]);
  const [user, setUser] = useState(null);

  // Charger les catégories
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement des catégories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Charger les groupes quand une catégorie est sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`http://localhost:3000/api/groups/category/${selectedCategory.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de chargement des groupes");
          return res.json();
        })
        .then((data) => {
          setGroupes(data);
          setSelectedGroupe(null); // Réinitialiser le groupe sélectionné
          setPublications([]); // Vider les publications
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  // Charger les publications quand un groupe est sélectionné
  useEffect(() => {
    if (selectedGroupe) {
      setLoading(true);
      console.log(selectedGroupe);
      fetch(
        `http://localhost:3000/api/publications/groups/${selectedGroupe.groupe_id}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de chargement des publications");
          return res.json();
        })
        .then((data) => setPublications(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedGroupe]);

  // Charger les commentaires
  const loadComments = (publicationId) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/comments/publication/${publicationId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement des commentaires");
        return res.json();
      })
      .then((data) => {
        setComments((prev) => ({ ...prev, [publicationId]: data }));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const { email } = useContext(UserContext);

  const userId = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/email/${email}`
      );
      if (!response.ok)
        setError("Erreur lors de la récupération de l'ID utilisateur");
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error("Erreur:", error);
      return null;
    }
  };

  const handlePublicationSubmit = async (e) => {
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
      if (!publiContent.trim()) {
        setError("La publication ne peut pas être vide.");
        return;
      }

      // Envoyer le commentaire au backend
      const response = await fetch(`http://localhost:3000/api/publications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title, // ID de la publication
          content: publiContent, // Contenu du commentaire
          user_id: user_id, // ID de l'utilisateur
          groupe_id: selectedGroupe.groupe_id, // ID du groupe
          //title, content, user_id, groupe_id
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la publication");
      }

      const newComment = await response.json();

      // Ajouter le nouveau commentaire à la liste existante
      setPublication((prev) => [newComment, ...prev]);
      setPubliContent(""); // Réinitialiser le champ de texte
      setError(null); // Réinitialiser les erreurs
      router.replace(`/forum`); //TODO:
    } catch (err) {
      console.error("Erreur :", err);
      setError(err.message); // Afficher l'erreur
    }
  };

  return (
    <div className="forum-container">
      <h1>Forum Communautaire</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Chargement...</div>}

      {/* categories buttons  */}
      <section className="categories-section">
        <h2>Catégories</h2>
        <div className="categories-list">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${
                selectedCategory?.id === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* groups buttons  */}
      {selectedCategory && (
        <section className="groups-section">
          <h2>Groupes dans {selectedCategory.name}</h2>
          <div className="groups-list">
            {groupes.map((groupe) => (
              <button
                key={groupe.id}
                className={`group-btn ${
                  selectedGroupe?.id === groupe.id ? "active" : ""
                }`}
                onClick={() => [setSelectedGroupe(groupe), setError("")]}
              >
                {groupe.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* publications  */}
      {selectedGroupe && (
        <section className="publications-section">
          <form onSubmit={handlePublicationSubmit} className="comment-form">
            <input
              className="groups-list"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ajouter un titre..."
              required
            />
            <textarea
              value={publiContent}
              onChange={(e) => setPubliContent(e.target.value)}
              placeholder="Ajouter une publication..."
              required
            />
            <button type="submit" className="submit-button">
              Publier
            </button>
          </form>
          {publications.length === 0 ? (
            <div className="error">
              Aucune publication trouvée dans ce groupe.
            </div>
          ) : (
            <>
              <h2>Publications dans {selectedGroupe.name}</h2>
              <div className="publications-list">
                {publications.map((pub) => (
                  <div key={pub.publication_id} className="publication-card">
                    <a
                      href={"/forum/" + pub.publication_id}
                      className="publication-link"
                    >
                      <h3>{pub.title}</h3>
                    </a>
                    <p>{pub.content}</p>
                    <button
                      onClick={() => loadComments(pub.publication_id)}
                      className="comments-btn"
                    >
                      Voir les commentaires
                    </button>
                    {/* Affichage des commentaires */}
                    {comments[pub.publication_id] && (
                      <div className="comments-section">
                        {comments[pub.publication_id]
                          .slice(0, 3)
                          .map((comment) => (
                            <div key={comment.id} className="comment">
                              <strong>{comment.username} :</strong>{" "}
                              {comment.content}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Forum;
