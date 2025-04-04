import { useState, useContext } from "react";
import withAuth from "./components/withAuth";
import { UserContext } from "./components/userContext";

const Dashboard = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setMessage({ type: "", text: "" });

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

      setMessage({ type: "success", text: "Profile updated successfully" });
      // Clear fields if needed
      if (password) setPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="admin-container">
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="New username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="date"
          placeholder="New birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <button type="submit" className="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
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
