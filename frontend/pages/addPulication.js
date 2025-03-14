import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AddThread() {
  const [title, setTitle] = useState("");
  const [datecreation, setDateCreation] = useState("");
  const [datemodification, setDateModification] = useState("");
  const [message, setMessage] = useState("");
  const [auteur, setAuteur] = useState("");

  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDateCreation(today);
    setDateModification(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        datecreation,
        datemodification,
        message,
        auteur,
      }),
    });

    if (response.ok) router.push("/");
  };

  return (
    <div>
      <h1>Ajouter une publication</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Auteur"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
