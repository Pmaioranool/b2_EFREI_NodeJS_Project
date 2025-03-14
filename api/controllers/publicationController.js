const Publication = require("../models/publication.js");

class publicationController{
static async publicationGetAll(req, res) {
  try {
    const publications = await Publication.getAllPublications();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SPECIFIC
static async publicationGet(req, res) {
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
};

// POST PUBLICATION
static async publicationPost(req, res) {
  try {
    const newPublication = await Publication.createPublication(req.body);
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// PUT PUBLICATION
static async publicationPut(req, res)  {
  try {
    const updatedPublication = await Publication.updatePublication(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
static async publicationDel(req, res) {
  try {
    await Publication.deletePublication(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

}

module.exports = publicationController;
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur le port ${PORT}`);
// });