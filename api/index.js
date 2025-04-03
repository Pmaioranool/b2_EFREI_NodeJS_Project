const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {
  CategoryController,
  CommentController,
  GroupController,
  MPController,
  PublicationController,
  ReportController,
  RoleController,
  ThreadsController,
  UserController,
  likesController,
  UGRController,
  TypeReportController,
} = require("./controllers/Controller.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Message d'accueil
app.get("/api/", (req, res) => res.send("Bienvenue sur mon API !"));

// Routes Publications
app
  .route("/api/publications")
  .get(PublicationController.getAll)
  .post(PublicationController.post);

app
  .route("/api/publications/:id")
  .get(PublicationController.get)
  .put(PublicationController.put)
  .delete(PublicationController.delete);

app.get("/api/publications/groups/:id", PublicationController.getByGroup);

// Routes Categories
app
  .route("/api/categories")
  .get(CategoryController.getAll)
  .post(CategoryController.post);

app
  .route("/api/categories/:id")
  .get(CategoryController.get)
  .put(CategoryController.put)
  .delete(CategoryController.delete);

// Routes Commentaires
app
  .route("/api/comments")
  .get(CommentController.getAll)
  .post(CommentController.post);

app
  .route("/api/comments/:id")
  .get(CommentController.get)
  .put(CommentController.put)
  .delete(CommentController.delete);

app.get("/api/comments/publication/:id", CommentController.getByPublication);

// Routes Groupes
app.route("/api/groups").get(GroupController.getAll).post(GroupController.post);

app
  .route("/api/groups/:id")
  .get(GroupController.get)
  .put(GroupController.put)
  .delete(GroupController.delete);

app.get("/api/groups/category/:id", GroupController.getGroupesByCategory);

// Routes Messages Privés (MP)
app.route("/api/mp").get(MPController.getAll).post(MPController.post);

app
  .route("/api/mp/:id")
  .get(MPController.get)
  .put(MPController.put)
  .delete(MPController.delete);

// Routes Reports
app
  .route("/api/reports")
  .get(ReportController.getAll)
  .post(ReportController.post);

app
  .route("/api/reports/:id")
  .get(ReportController.get)
  .put(ReportController.put)
  .delete(ReportController.delete);

// Routes Rôles
app.route("/api/roles").get(RoleController.getAll).post(RoleController.post);

app
  .route("/api/roles/:id")
  .get(RoleController.get)
  .put(RoleController.put)
  .delete(RoleController.delete);

// Routes Threads
app
  .route("/api/threads")
  .get(ThreadsController.getAll)
  .post(ThreadsController.post);

app
  .route("/api/threads/:id")
  .get(ThreadsController.get)
  .put(ThreadsController.put)
  .delete(ThreadsController.delete);

// Routes Utilisateurs
app.get("/api/users", UserController.getAll);
app.post("/api/users/register", UserController.post);
app.post("/api/users/login", UserController.login);
app.post("/api/users/ban", UserController.ban);
app.post("/api/users/unBan", UserController.unBan);
app.get("/api/users/email/:email", UserController.getByEmail);

app
  .route("/api/users/:id")
  .get(UserController.get)
  .put(UserController.put)
  .delete(UserController.delete);

// Routes likes
app.route("/api/likes").get(likesController.getAll).post(likesController.post);

app
  .route("/api/likes/:id")
  .get(likesController.get)
  .put(likesController.put)
  .delete(likesController.delete);

app.get("/api/likes/publication/:id", likesController.getByPublication);
app.get("/api/likes/user/:id", likesController.getByUser);

// Routes UGR
app.route("/api/UGR").get(UGRController.getAll).post(UGRController.post);

app
  .route("/api/UGR/:id")
  .get(UGRController.get)
  .put(UGRController.put)
  .delete(UGRController.delete);

// Routes TypeReport
app
  .route("/api/TypeReport")
  .get(TypeReportController.getAll)
  .post(TypeReportController.post);

app
  .route("/api/TypeReport/:id")
  .get(TypeReportController.get)
  .put(TypeReportController.put)
  .delete(TypeReportController.delete);

app.post("/api/users/update", async (req, res) => {
  try {
    const { username, password, birthdate } = req.body;

    // Vérifiez que les champs requis sont présents
    if (!username || !password || !birthdate) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Exemple : Récupérer l'utilisateur connecté via le token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token manquant ou invalide." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token invalide." });
      }

      const userId = decoded.id; // Assurez-vous que le token contient l'ID utilisateur

      // Exemple de mise à jour dans la base de données
      try {
        const result = await UserController.updateProfile(userId, {
          username,
          password,
          birthdate,
        });

        if (result) {
          res.status(200).json({ message: "Profil mis à jour avec succès." });
        } else {
          res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du profil." });
        }
      } catch (dbError) {
        console.error(dbError);
        res.status(500).json({ error: "Erreur interne du serveur." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur interne s'est produite." });
  }
});

// Route pour le décryptage du token
app.get("/api/token/decrypt", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).json({ error: "Token manquant !" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ error: "Erreur de décryptage du token ! " + err.message });

      res.status(200).json({ role: decoded.role, email: decoded.email });
    });
  } catch (error) {
    res.status(500).json({ error: "Une erreur interne s'est produite." });
  }
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne s'est produite." });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
