const { pool } = require("../database/database.js");

class Groupes {
  static async getGroupesByCategory(categoryId) {
    const query = `SELECT * FROM groupes WHERE categories_id = $1`;

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
