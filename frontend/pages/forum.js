import React, { useState, useEffect } from 'react';

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [publications, setPublications] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les catégories
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement des catégories');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Charger les groupes quand une catégorie est sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`http://localhost:3000/api/groups/category/${selectedCategory.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erreur de chargement des groupes');
          return res.json();
        })
        .then(data => {
          setGroupes(data);
          setSelectedGroupe(null); // Réinitialiser le groupe sélectionné
          setPublications([]); // Vider les publications
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  // Charger les publications quand un groupe est sélectionné
  useEffect(() => {
    if (selectedGroupe) {
      setLoading(true);
      fetch(`http://localhost:3000/api/publications?groupId=${selectedGroupe.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erreur de chargement des publications');
          return res.json();
        })
        .then(data => setPublications(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedGroupe]);

  // Charger les commentaires
  const loadComments = (publicationId) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/comments?publicationId=${publicationId}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement des commentaires');
        return res.json();
      })
      .then(data => {
        setComments(prev => ({ ...prev, [publicationId]: data }));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="forum-container">
      <h1>Forum Communautaire</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Chargement...</div>}

      <section className="categories-section">
        <h2>Catégories</h2>
        <div className="categories-list">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory?.id === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <section className="groups-section">
          <h2>Groupes dans {selectedCategory.name}</h2>
          <div className="groups-list">
            {groupes.map(groupe => (
              <button
                key={groupe.id}
                className={`group-btn ${selectedGroupe?.id === groupe.id ? 'active' : ''}`}
                onClick={() => setSelectedGroupe(groupe)}
              >
                {groupe.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {selectedGroupe && (
        <section className="publications-section">
          <h2>Publications dans {selectedGroupe.name}</h2>
          <div className="publications-list">
            {publications.map(pub => (
              <div key={pub.publication_id} className="publication-card">
                <h3>{pub.title}</h3>
                <p>{pub.content}</p>
                <button 
                  onClick={() => loadComments(pub.publication_id)}
                  className="comments-btn"
                >
                  Voir les commentaires ({comments[pub.publication_id]?.length || 0})
                </button>
                
                {comments[pub.publication_id] && (
                  <div className="comments-section">
                    {comments[pub.publication_id].map(comment => (
                      <div key={comment.id} className="comment">
                        <strong>{comment.username}:</strong> {comment.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Forum;