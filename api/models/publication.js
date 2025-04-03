const {pool} = require("../database/database.js");

class Publications {

  static async getByGroup(id) {
    const sqlQuery = "SELECT * FROM publications WHERE groupe_id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }
}

module.exports = Publications;