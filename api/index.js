const express = require("express");
const Publication = require("./controllers/publicationController.js");
const User = require("./controllers/UserController.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(express.json());

console.log(User);
console.log(Publication);
// console.log(User);
// Endpoints
app.post('/register', User.registerPost);
app.get('/get-user',User.Debug);

app.get("/publications", Publication.publicationGetAll);
app.post("/publications", Publication.publicationPost);
app.get("/publications/:id", Publication.publicationGet);
app.put("/publications/:id", Publication.publicationPut);
app.delete("/publications/:id", Publication.publicationDel);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});