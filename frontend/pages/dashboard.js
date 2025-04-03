import { useEffect, useState } from "react";

const Dashboard = () => {
  const [Usertoken, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      fetch("http://localhost:3000/api/token/decrypt", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des données utilisateur."
            );
          }
          return response.json();
        })
        .then((data) => {
          setUserProfile(data);
          setFormData({ name: data.name, email: data.email, password: "" });
        })
        .catch((error) => {
          const token = localStorage.getItem("token");
          console.log("Token récupéré :", token);
          console.error("Erreur :", error.message);
          setError("Impossible de charger les informations utilisateur.");
          //window.location.href = "/login"; // Redirige vers la page de connexion
        })
        .finally(() => setLoading(false));
    } else {
      console.error(
        "Aucun token trouvé. Redirection vers la page de connexion."
      );
      window.location.href = "/login"; // Redirige si aucun token n'est trouvé
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/dashboard/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du profil.");
          }
          return response.json();
        })
        .then((updatedData) => {
          setUserProfile(updatedData);
          setEditMode(false);
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
          {!editMode ? (
            <div>
              <p>Nom : {userProfile.name}</p>
              <p>Email : {userProfile.email}</p>
              <button onClick={() => setEditMode(true)}>
                Modifier le profil
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Nom :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Mot de passe :</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
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

export default Dashboard;
