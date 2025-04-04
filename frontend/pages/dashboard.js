import { useState, useContext } from "react";
import withAuth from "./components/withAuth";
import { UserContext } from "./components/userContext";

const Dashboard = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const hashedPassword = password
      ? await fetch("http://localhost:3000/api/hash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: password }),
        }).then((res) => res.json())
      : null;

    try {
      const user_Id = await userId(email);
      if (!user_Id) {
        setMessage({ type: "error", text: "Utilisateur introuvable." });
        return;
      }

      if (!username && !password && !birthdate) {
        setMessage({
          type: "error",
          text: "Veuillez remplir au moins un champ.",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/users/${user_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: hashedPassword,
            birthdate: birthdate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la publication");
      }

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
};

export default withAuth(Dashboard, { requireAdmin: false });
