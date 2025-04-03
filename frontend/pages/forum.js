import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./components/userContext";

const Forum = () => {
  const { email } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [publications, setPublications] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", groupeId: "" });
  const [formError, setFormError] = useState("");

  // Charger les catégories
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  // Charger les groupes
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`http://localhost:3000/api/groups/category/${selectedCategory.id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupes(data);
        setSelectedGroupe(null);
        setPublications([]);
        setFormData((prev) => ({ ...prev, groupeId: data[0]?.groupe_id || "" }));
      })
      .catch((err) => setError(err.message));
  }, [selectedCategory]);

  // Charger les publications du groupe
  useEffect(() => {
    if (!selectedGroupe) return;
    fetch(`http://localhost:3000/api/publications/groups/${selectedGroupe.groupe_id}`)
      .then((res) => res.json())
      .then(setPublications)
      .catch((err) => setError(err.message));
  }, [selectedGroupe]);

  // Charger les commentaires d'une publication
  const loadComments = (publicationId) => {
    fetch(`http://localhost:3000/api/comments/publication/${publicationId}`)
      .then((res) => res.json())
      .then((data) => setComments((prev) => ({ ...prev, [publicationId]: data })))
      .catch((err) => setError(err.message));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setFormError("Vous devez être connecté.");

    try {
      const resUser = await fetch(`http://localhost:3000/api/users/email/${email}`);
      const user = await resUser.json();

      const res = await fetch("http://localhost:3000/api/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          user_id: user.user_id,
          groupe_id: formData.groupeId,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      const newPub = await res.json();
      if (selectedGroupe?.groupe_id === newPub.groupe_id) {
        setPublications((prev) => [newPub, ...prev]);
      }

      setShowForm(false);
      setFormData({ title: "", content: "", groupeId: groupes[0]?.groupe_id || "" });
    } catch (err) {
      console.error(err);
      setFormError(err.message);
    }
  };

  return (
    <div className='forum-container'>
      <h1>Forum Communautaire</h1>

      {/* Catégories */}
      <section className='categories-section'>
        <h2>Catégories</h2>
        <div className='categories-list'>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory?.id === cat.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setShowForm(false);
              }}>
              {cat.name}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <button className='forum-btn' onClick={() => setShowForm(!showForm)}>
            {showForm ? "Annuler" : "Ajouter une publication"}
          </button>
        )}
      </section>

      {/* Formulaire */}
      {showForm && (
        <form className='ajout-pub' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Titre'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder='Contenu'
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
          <select
            value={formData.groupeId}
            onChange={(e) => setFormData({ ...formData, groupeId: e.target.value })}
            required>
            {groupes.map((g) => (
              <option key={g.groupe_id} value={g.groupe_id}>
                {g.name}
              </option>
            ))}
          </select>
          <input type='submit' className='submit' value='Publier' />
          {formError && <p className='error'>{formError}</p>}
        </form>
      )}

      {/* Groupes */}
      {selectedCategory && (
        <section className='groups-section'>
          <h2>Groupes dans {selectedCategory.name}</h2>
          <div className='groups-list'>
            {groupes.map((groupe) => (
              <button
                key={groupe.id}
                className={`group-btn ${selectedGroupe?.id === groupe.id ? "active" : ""}`}
                onClick={() => [setSelectedGroupe(groupe), setError("")]}>
                {groupe.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {selectedGroupe && (
        <section className='publications-section'>
          <h2>Publications dans {selectedGroupe.name}</h2>
          {publications.length === 0 ? (
            <p>Aucune publication</p>
          ) : (
            publications.map((pub) => (
              <div key={pub.publication_id} className='publication-card'>
                <a href={`/forum/${pub.publication_id}`}>
                  <h3>{pub.title}</h3>
                </a>
                <p>{pub.content}</p>
                <button onClick={() => loadComments(pub.publication_id)} className='comments-btn'>
                  Voir les commentaires
                </button>
                {comments[pub.publication_id] && (
                  <div className='comments-section'>
                    {comments[pub.publication_id].slice(0, 3).map((comment) => (
                      <div key={comment.id} className='comment'>
                        <strong>{comment.username}</strong> : {comment.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
};

export default Forum;
