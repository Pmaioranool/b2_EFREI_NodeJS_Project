import { useState } from "react";
import withAuth from "./components/withAuth";

function Dashboard() {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "Authentication token missing" });
      setIsLoading(false);
      return;
    }

    const payload = {};
    if (username) payload.username = username;
    if (password) payload.password = password;
    if (birthdate) payload.birthdate = birthdate;

    if (Object.keys(payload).length === 0) {
      setMessage({ type: "error", text: "No changes to update" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
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
}

export default withAuth(Dashboard, { requireAdmin: false });
