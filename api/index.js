const express = require("express");
// const cors = require("cors");
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
// app.use(cors());
// app.use(helmet());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Message d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API !");
});

// Routes Publications
app.get("/publications", PublicationController.getAll);
app.post("/publications", PublicationController.post);
app.get("/publications/:id", PublicationController.get);
app.put("/publications/:id", PublicationController.put);
app.delete("/publications/:id", PublicationController.delete);

// Routes Categories
app.get("/categories", CategoryController.getAll);
app.post("/categories", CategoryController.post);
app.get("/categories/:id", CategoryController.get);
app.put("/categories/:id", CategoryController.put);
app.delete("/categories/:id", CategoryController.delete);

// Routes Commentaires
app.get("/comments", CommentController.getAll);
app.post("/comments", CommentController.post);
app.get("/comments/:id", CommentController.get);
app.put("/comments/:id", CommentController.put);
app.delete("/comments/:id", CommentController.delete);

// Routes Groupes
app.get("/groups", GroupController.getAll);
app.post("/groups", GroupController.post);
app.get("/groups/:id", GroupController.get);
app.put("/groups/:id", GroupController.put);
app.delete("/groups/:id", GroupController.delete);

// Routes Messages Privés (MP)
app.get("/mp", MPController.getAll);
app.post("/mp", MPController.post);
app.get("/mp/:id", MPController.get);
app.put("/mp/:id", MPController.put);
app.delete("/mp/:id", MPController.delete);

// Routes Reports
app.get("/reports", ReportController.getAll);
app.post("/reports", ReportController.post);
app.get("/reports/:id", ReportController.get);
app.put("/reports/:id", ReportController.put);
app.delete("/reports/:id", ReportController.delete);

// Routes Rôles
app.get("/roles", RoleController.getAll);
app.post("/roles", RoleController.post);
app.get("/roles/:id", RoleController.get);
app.put("/roles/:id", RoleController.put);
app.delete("/roles/:id", RoleController.delete);

// Routes Threads
app.get("/threads", ThreadsController.getAll);
app.post("/threads", ThreadsController.post);
app.get("/threads/:id", ThreadsController.get);
app.put("/threads/:id", ThreadsController.put);
app.delete("/threads/:id", ThreadsController.delete);

// Routes Utilisateurs
app.get("/users", UserController.getAll);
app.post("/users", UserController.post);
app.get("/users/:id", UserController.get);
app.put("/users/:id", UserController.put);
app.delete("/users/:id", UserController.delete);

// Routes Utilisateurs
app.get("/likes", likesController.getAll);
app.post("/likes", likesController.post);
app.get("/likes/:id", likesController.get);
app.put("/likes/:id", likesController.put);
app.delete("/likes/:id", likesController.delete);

// Routes Utilisateurs
app.get("/UGR", UGRController.getAll);
app.post("/UGR", UGRController.post);
app.get("/UGR/:id", UGRController.get);
app.put("/UGR/:id", UGRController.put);
app.delete("/UGR/:id", UGRController.delete);

// Routes Utilisateurs
app.get("/TypeReport", TypeReportController.getAll);
app.post("/TypeReport", TypeReportController.post);
app.get("/TypeReport/:id", TypeReportController.get);
app.put("/TypeReport/:id", TypeReportController.put);
app.delete("/TypeReport/:id", TypeReportController.delete);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne s'est produite." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
