const { pool } = require("../database/database.js");

class Categories {
  static async getLikesByPublication(id) {
    const sqlQuery =
      "select * from likes inner join publications where publication_id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }

  static async getLikesByUser(id) {
    const sqlQuery = "select * from likes inner join users where user_id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }
}

module.exports = Categories;
