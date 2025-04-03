const { pool } = require("../database/database.js");

class Model {
  // 🔹 Récupérer toutes les entrées d'un modèle
  static async getAll(model) {
    const sqlQuery = `SELECT * FROM ${model}`;
    const stmt = await pool.query(sqlQuery);
    return stmt.rows;
  }

  // 🔹 Récupérer une entrée par ID
  static async getById(model, id) {
    const sqlQuery = `SELECT * FROM ${model} WHERE id = $1`;
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows[0]; // Retourne un seul résultat
  }

  // 🔹 Créer une nouvelle entrée avec des colonnes dynamiques
  static async create(model, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");

    const sqlQuery = `INSERT INTO ${model} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
    const stmt = await pool.query(sqlQuery, values);
    return stmt.rows[0];
  }

  // 🔹 Mettre à jour une entrée avec des colonnes dynamiques
  static async update(model, Id, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    const sqlQuery = `UPDATE ${model} SET ${setClause} WHERE ${Id} = $${keys.length + 1} RETURNING *`;
    const stmt = await pool.query(sqlQuery, [...values, id]);
    return stmt.rows[0];
  }

  // 🔹 Supprimer une entrée
  static async delete(model,Id, id) {
    const sqlQuery = `DELETE FROM ${model} WHERE ${Id} = $1`;
    await pool.query(sqlQuery, [id]);
    return true;
  }
}

module.exports = Model;
