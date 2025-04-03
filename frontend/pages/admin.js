import { useState } from "react";
import withAuth from "./components/withAuth";

function AdminPage() {
  const [message, setMessage] = useState({ type: "", text: "" });

  const [banEmail, setBanEmail] = useState("");
  const [unBanEmail, setUnBanEmail] = useState("");

  const handleBan = async (e) => {
    e.preventDefault();

    const payload = { email: banEmail };

    try {
      const response = await fetch("http://localhost:3000/api/users/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.message) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({ type: "success", text: "Utilisateur banni avec succès." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
    setBanEmail("");
  };

  const handleUnBan = async (e) => {
    e.preventDefault();

    const payload = { email: unBanEmail };

    try {
      const response = await fetch("http://localhost:3000/api/users/unBan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.message) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({
          type: "success",
          text: "Utilisateur débanni avec succès.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
    setUnBanEmail("");
  };

  return (
    <section className="admin-container">
      <form onSubmit={handleBan}>
        <input
          type="text"
          placeholder="Email"
          value={banEmail}
          onChange={(e) => setBanEmail(e.target.value)}
          required
        />
        <input type="submit" className="submit" value="Ban User" />
      </form>

      <form onSubmit={handleUnBan}>
        <input
          type="text"
          placeholder="Email"
          value={unBanEmail}
          onChange={(e) => setUnBanEmail(e.target.value)}
          required
        />
        <input type="submit" className="submit" value="UnBan User" />
      </form>

      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </p>
      )}
    </section>
  );
}

export default withAuth(AdminPage, { requireAdmin: true });
