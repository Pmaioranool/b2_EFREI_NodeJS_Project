ww; // TODO : a faire
const { pool } = require("../database/database.js");

class Threads {
  static async getThreads() {
    const sqlQuery = "select * from threads";
    const stmt = await pool.query(sqlQuery);
    return stmt.rows;
  }

  static async getThreadById(id) {
    const sqlQuery = "select * from threads where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }

  static async createThread(name) {
    const sqlQuery = "insert into threads (name) values ($1)";
    const stmt = await pool.query(sqlQuery, [name]);
    return stmt;
  }

  static async updateThread(id, name) {
    const sqlQuery = "update threads set name = $1 where id = $2";
    const stmt = await pool.query(sqlQuery, [name, id]);
    return stmt;
  }

  static async deleteThread(id) {
    const sqlQuery = "delete from threads where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt;
  }
}

module.exports = Threads;
