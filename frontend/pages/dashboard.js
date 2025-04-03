import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserProfile(data);
          setFormData({ name: data.name, email: data.email, password: "" });
        })
        .catch((error) => console.error("Error fetching profile:", error));
    } else {
      console.error("No token found. Please log in.");
      window.location.href = "/login";
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
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update profile");
          }
        })
        .then((updatedData) => {
          setUserProfile(updatedData);
          setEditMode(false);
        })
        .catch((error) => console.error("Error updating profile:", error));
    }
  };

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
        <p>Chargement des informations du profil...</p>
      )}
    </div>
  );
};

export default Dashboard;
