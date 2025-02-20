import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  // Récupération des livres depuis l'API
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Erreur lors du chargement :", err));
  }, []);

  // Fonction pour supprimer un livre
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setBooks(books.filter((book) => book.id !== id)); // Met à jour l'affichage
    } else {
      console.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Liste des Livres
      </h1>
      <a
        href="/add"
        className="block w-max mx-auto mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Ajouter un Livre
      </a>
      <div className="bg-white shadow-md rounded-lg p-6">
        {books.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun livre disponible.</p>
        ) : (
          <ul className="space-y-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <a
                  href={`/book/${book.id}`}
                  className="text-lg font-semibold text-gray-700 hover:text-blue-500"
                >
                  {book.title} - {book.author} ({book.year})
                </a>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-3 py-1 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
