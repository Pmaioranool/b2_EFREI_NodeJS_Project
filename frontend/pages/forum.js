import React, { useState, useEffect } from 'react';

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [publications, setPublications] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les catégories au montage du composant
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Charger les groupes en fonction de la catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`http://localhost:3000/api/groups/by-category?categories_id=${selectedCategory.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erreur lors du chargement des groupes');
          return res.json();
        })
        .then(data => setGroupes(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  // Charger les publications en fonction du groupe sélectionné
  useEffect(() => {
    if (selectedGroupe) {
      setLoading(true);
      fetch(`http://localhost:3000/api/publications?groupId=${selectedGroupe.id}`) // Fixed URL
        .then(res => {
          if (!res.ok) throw new Error('Erreur lors du chargement des publications');
          return res.json();
        })
        .then(data => setPublications(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedGroupe]);

  // Fonction pour charger les commentaires d'une publication donnée
  const loadComments = (publicationId) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/comments?publicationId=${publicationId}`) // Fixed URL
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des commentaires');
        return res.json();
      })
      .then(data => {
        setComments(prev => ({ ...prev, [publicationId]: data }));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Forum Communautaire</h1>

      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      {loading && <p>Chargement...</p>}

      {/* Liste des catégories */}
      <section>
        <h2>Catégories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>
              <button onClick={() => {
                setSelectedCategory(cat);
                setSelectedGroupe(null);
                setPublications([]);
              }}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Liste des groupes pour la catégorie sélectionnée */}
      {selectedCategory && (
        <section>
          <h2>Groupes dans la catégorie "{selectedCategory.name}"</h2>
          <ul>
            {groupes.map(groupe => (
              <li key={groupe.id}>
                <button onClick={() => {
                  setSelectedGroupe(groupe);
                  setPublications([]);
                }}>
                  {groupe.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Liste des publications pour le groupe sélectionné */}
      {selectedGroupe && (
        <section>
          <h2>Publications dans le groupe "{selectedGroupe.name}"</h2>
          <ul>
            {publications.map(pub => (
              <li key={pub.publication_id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
                <h3>{pub.title}</h3>
                <p>{pub.content}</p>
                <button onClick={() => loadComments(pub.publication_id)}>
                  Voir les commentaires
                </button>
                {/* Afficher les commentaires si déjà chargés */}
                {comments[pub.publication_id] && (
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                    {comments[pub.publication_id].map(comment => (
                      <li key={comment.id}>
                        {comment.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Forum;