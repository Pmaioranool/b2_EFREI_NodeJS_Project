ww; // TODO : a faire
const { pool } = require("../database/database.js");

class Roles {
  static async getRoles() {
    const sqlQuery = "select * from Roles";
    const stmt = await pool.query(sqlQuery);
    return stmt.rows;
  }

  static async getRoleById(id) {
    const sqlQuery = "select * from Roles where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt.rows;
  }

  static async createRole(name) {
    const sqlQuery = "insert into Roles (name) values ($1)";
    const stmt = await pool.query(sqlQuery, [name]);
    return stmt;
  }

  static async updateRole(id, name) {
    const sqlQuery = "update Roles set name = $1 where id = $2";
    const stmt = await pool.query(sqlQuery, [name, id]);
    return stmt;
  }

  static async deleteRole(id) {
    const sqlQuery = "delete from Roles where id = $1";
    const stmt = await pool.query(sqlQuery, [id]);
    return stmt;
  }
}

module.exports = Roles;
