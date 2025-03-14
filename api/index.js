const  express = require("express");
const Publication = require("./models/publication.js");
const User = require("./models/User.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


dotenv.config();

const app = express();
app.use(express.json());

// Endpoints
app.get("/publications", async (req, res) => {
  try {
    const publications = await Publication.getAllPublications();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SPECIFIC
app.get("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.getPublicationById(req.params.id);
    publication
      ? res.status(200).json(publication)
      : res.status(404).json({
          message: "Pas trouvé",
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST PUBLICATION
app.post("/publications", async (req, res) => {
  try {
    const newPublication = await Publication.createPublication(req.body);
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    const newUser = await User.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// TODO: debug
app.get("/get-user", async (req, res) => {
  try {
    const user = await User.getUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT PUBLICATION
app.put("/publications/:id", async (req, res) => {
  try {
    const updatedPublication = await Publication.updatePublication(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
app.delete("/publications/:id", async (req, res) => {
  try {
    await Publication.deletePublication(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
