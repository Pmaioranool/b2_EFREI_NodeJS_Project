const { pool } = require("../database/database.js");

class Groupes {
  static async getGroupesByCategory(categoryId) {
    // console.log("Category ID reçu :", categoryId); // Ajoutez ce log pour vérifier la valeur
    const query = `
      SELECT * FROM groupes
      WHERE category_id = $1
    `; // Assurez-vous que `category_id` est le bon nom de colonne dans votre table

    try {
      const result = await pool.query(query, [categoryId]); // Utilisation correcte de `pool.query`
      return result.rows;
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
      throw error;
    }
  }
}

module.exports = Groupes;