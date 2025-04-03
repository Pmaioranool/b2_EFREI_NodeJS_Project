import { useState } from "react";
import withAuth from "./components/withAuth";

function Dashboard() {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
      birthdate,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajout du token JWT
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.message) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({ type: "success", text: "Profil mis à jour avec succès." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };
  return (
    <section className="admin-container">
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Nouveau pseudo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="date"
          placeholder="Nouvelle date d'anniversaire"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          type="submit"
          className="submit"
          value="Mettre à jour le profil"
        />
      </form>

      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </p>
      )}
    </section>
  );
}

export default withAuth(Dashboard, { requireAdmin: false });
