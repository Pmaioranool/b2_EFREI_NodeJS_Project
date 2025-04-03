import { useState } from "react";

export default function Forum() {
  const [showPopup, setShowPopup] = useState(false);
  const [post, setPost] = useState({ author: "", message: "" });

  const handleAddPost = () => {
    console.log("Post ajouté :", post);
    setShowPopup(false);
    setPost({ author: "", message: "" });
  };

  return (
    <div>
      <h1>Forum</h1>
      <button onClick={() => setShowPopup(true)}>Ajouter un post</button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h2>Ajouter un post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddPost();
            }}
          >
            <div>
              <label>
                Auteur:
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost({ ...post, author: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Message:
                <textarea
                  value={post.message}
                  onChange={(e) =>
                    setPost({ ...post, message: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <button type="submit">Ajouter</button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              style={{ marginLeft: "10px" }}
            >
              Annuler
            </button>
          </form>
        </div>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setShowPopup(false)}
        ></div>
      )}
    </div>
  );
}
