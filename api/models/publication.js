const {pool} = require("../database/database.js");

class Publications {
  static async getAllPublications() {
    const sqlQuery = "select * from Publications";
    const stmt = await pool.query(sqlQuery);
    return stmt.rows;
  }

  static async getPublicationById(id) {
    const sqlQuery = "select * from Publications where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }

  static async createPublication(name) {
    const sqlQuery = "insert into Publications (name) values ($1)";
    const stmt = await pool.query(sqlQuery, [name]);
    return stmt;
  }

  static async updatePublication(id, name) {
    const sqlQuery = "update Publications set name = $1 where id = $2";
    const stmt = await pool.query(sqlQuery, [name, id]);
    return stmt;
  }

  static async deletePublication(id) {
    const sqlQuery = "delete from Publications where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt;
  }
}

module.exports = Publications;