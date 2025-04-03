import { useEffect, useState } from "react";
import withAuth from "./components/withAuth";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/api/token/decrypt", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Erreur lors de la récupération des données utilisateur."
            );
          return response.json();
        })
        .then((data) => {
          setUserProfile(data);
          setFormData({ username: data.username });
        })
        .catch(() => {
          setError("Impossible de charger les informations utilisateur.");
          window.location.href = "/login";
        })
        .finally(() => setLoading(false));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/api/dashboard/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: formData.username }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la mise à jour du nom d'utilisateur."
            );
          }
          return response.json();
        })
        .then((updatedData) => {
          setUserProfile(updatedData);
          setEditMode(false);
        })
        .catch(() => setError("Impossible de mettre à jour le profil."));
    }
  };

  if (loading) return <p>Chargement des informations utilisateur...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userProfile ? (
        <div>
          <p>
            <strong>Nom d'utilisateur :</strong> {userProfile.username}
          </p>
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>
              Modifier le nom d'utilisateur
            </button>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setEditMode(false)}>
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
