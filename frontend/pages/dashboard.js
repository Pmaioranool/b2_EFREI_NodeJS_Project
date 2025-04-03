import { useEffect, useState } from "react";
import withAuth from "./components/withAuth";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null); // Stocke les données utilisateur
  const [editMode, setEditMode] = useState(false); // Active ou désactive le mode édition
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Récupération des données utilisateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token);

    if (token) {
      fetch("http://localhost:3000/api/token/decrypt", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données utilisateur.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Données utilisateur récupérées :", data);
          setUserProfile(data);
          setFormData({ name: data.name }); // Pré-remplit le formulaire avec le nom
        })
        .catch((error) => {
          console.error("Erreur :", error.message);
          setError("Impossible de charger les informations utilisateur.");
          window.location.href = "/login"; // Redirige vers la page de connexion
        })
        .finally(() => setLoading(false));
    } else {
      console.error("Aucun token trouvé. Redirection vers la page de connexion.");
      window.location.href = "/login"; // Redirige si aucun token n'est trouvé
    }
  }, []);

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumission du formulaire pour mettre à jour le nom
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Données envoyées :", formData); // Log des données envoyées
      fetch("http://localhost:3000/api/dashboard/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log("Statut de la réponse :", response.status); // Log du statut HTTP
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Erreur API :", error); // Log de l'erreur renvoyée par l'API
              throw new Error(error.message || "Erreur inconnue");
            });
          }
          return response.json();
        })
        .then((updatedData) => {
          console.log("Profil mis à jour :", updatedData);
          setUserProfile(updatedData);
          setEditMode(false); // Désactive le mode édition après la mise à jour
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour :", error.message);
          setError("Impossible de mettre à jour le profil.");
        });
    }
  };

  if (loading) {
    return <p>Chargement des informations utilisateur...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {userProfile ? (
        <div>
          <p>
            <strong>Nom :</strong> {userProfile.name}
          </p>{" "}
          {/* Affiche toujours le nom */}
          {!editMode ? (
            <div>
              <button onClick={() => setEditMode(true)}>Modifier le nom</button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Nom :</label>
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
              </div>
              <button type='submit'>Enregistrer</button>
              <button type='button' onClick={() => setEditMode(false)}>
                Annuler
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>Aucune information utilisateur trouvée.</p>
      )}
    </div>
  );
};

export default withAuth(Dashboard);
