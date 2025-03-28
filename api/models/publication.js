const {pool} = require("../database/database.js");

class Publications {
  static async getAllPublications() {
    const sqlQuery = "select * from Publications";
    const stmt = await pool.query(sqlQuery);
    return stmt.rows;
  }

  static async getPublicationById(publication_id) {
    const sqlQuery = "select * from Publications where publication_id = $1";
    const stmt = await pool.query(sqlQuery, [publication_id]);
    return stmt.rows;
  }

  static async createPublication({title, content, user_id,groupe_id }) {
    const sqlQuery = "insert into Publications (title, content, user_id,groupe_id ) values ($1,$2,$3,$4)";
    const stmt = await pool.query(sqlQuery, [title, content, user_id,groupe_id ]);
    return stmt;
  }

  static async updatePublication(publication_id, title) {
    const sqlQuery = "update Publications set title = $1 where id = $2";
    const stmt = await pool.query(sqlQuery, [title, publication_id]);
    return stmt;
  }

  static async deletePublication(publication_id) {
    const sqlQuery = "delete from Publications where publication_id = $1";
    const stmt = await pool.query(sqlQuery, [publication_id]);
    return stmt;
  }
}

module.exports = Publications;