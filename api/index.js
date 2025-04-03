const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
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
  TypeReportController
} = require("./controllers/Controller.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // ou "*" pour autoriser toutes les origines
  credentials: true, // si vous gérez des cookies ou des sessions
}));
// app.use(helmet());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Message d'accueil
app.get("/api/", (req, res) => {
  res.send("Bienvenue sur mon API !");
});

// Routes Publications
app.get("/api/publications", PublicationController.getAll);
app.post("/api/publications", PublicationController.post);
app.get("/api/publications/:id", PublicationController.get);
app.put("/api/publications/:id", PublicationController.put);
app.delete("/api/publications/:id", PublicationController.delete);

// Routes Categories
app.get("/api/categories", CategoryController.getAll);
app.post("/api/categories", CategoryController.post);
app.get("/api/categories/:id", CategoryController.get);
app.put("/api/categories/:id", CategoryController.put);
app.delete("/api/categories/:id", CategoryController.delete);

// Routes Commentaires
app.get("/api/comments", CommentController.getAll);
app.post("/api/comments", CommentController.post);
app.get("/api/comments/:id", CommentController.get);
app.put("/api/comments/:id", CommentController.put);
app.delete("/api/comments/:id", CommentController.delete);

// Routes Groupes
app.get("/api/groups", GroupController.getAll);
app.post("/api/groups", GroupController.post);
app.get("/api/groups/:id", GroupController.get);
app.put("/api/groups/:id", GroupController.put);
app.delete("/api/groups/:id", GroupController.delete);

// Routes Messages Privés (MP)
app.get("/api/mp", MPController.getAll);
app.post("/api/mp", MPController.post);
app.get("/api/mp/:id", MPController.get);
app.put("/api/mp/:id", MPController.put);
app.delete("/api/mp/:id", MPController.delete);

// Routes Reports
app.get("/api/reports", ReportController.getAll);
app.post("/api/reports", ReportController.post);
app.get("/api/reports/:id", ReportController.get);
app.put("/api/reports/:id", ReportController.put);
app.delete("/api/reports/:id", ReportController.delete);

// Routes Rôles
app.get("/api/roles", RoleController.getAll);
app.post("/api/roles", RoleController.post);
app.get("/api/roles/:id", RoleController.get);
app.put("/api/roles/:id", RoleController.put);
app.delete("/api/roles/:id", RoleController.delete);

// Routes Threads
app.get("/api/threads", ThreadsController.getAll);
app.post("/api/threads", ThreadsController.post);
app.get("/api/threads/:id", ThreadsController.get);
app.put("/api/threads/:id", ThreadsController.put);
app.delete("/api/threads/:id", ThreadsController.delete);

// Routes Utilisateurs
app.get("/api/users", UserController.getAll);
app.post("/api/users/register", UserController.post);
app.get("/api/users/:id", UserController.get);
app.put("/api/users/:id", UserController.put);
app.delete("/api/users/:id", UserController.delete);
app.post("/api/users/login", UserController.login);

// Routes likes
app.get("/api/likes", likesController.getAll);
app.post("/api/likes", likesController.post);
app.get("/api/likes/:id", likesController.get);
app.put("/api/likes/:id", likesController.put);
app.delete("/api/likes/:id", likesController.delete);

// Routes UGR
app.get("/api/UGR", UGRController.getAll);
app.post("/api/UGR", UGRController.post);
app.get("/api/UGR/:id", UGRController.get);
app.put("/api/UGR/:id", UGRController.put);
app.delete("/UGR/:id", UGRController.delete);

// Routes TypeReport
app.get("/api/TypeReport", TypeReportController.getAll);
app.post("/api/TypeReport", TypeReportController.post);
app.get("/api/TypeReport/:id", TypeReportController.get);
app.put("/api/TypeReport/:id", TypeReportController.put);
app.delete("/api/TypeReport/:id", TypeReportController.delete);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne s'est produite." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
