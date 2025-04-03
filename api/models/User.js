const { pool } = require("../database/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  static async register({ username, email, password, birthdate }) {
    const isUser = await this.getUserByEmail(email);
    if (isUser) return false;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sqlQuery =
      "INSERT INTO users (username, email, password, birthdate, role_id) VALUES ($1, $2, $3, $4, 2);";
    const parameter = [username, email, hashedPassword, birthdate];
    const stmt = await pool.query(sqlQuery, parameter);

    const token = jwt.sign(
      {
        email: email,
        role: 2,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  static async login({ email, password }) {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    if (!stmt.rows.length) {
      return false;
    }

    const isPasswordValid = bcrypt.compareSync(password, stmt.rows[0].password);
    if (!isPasswordValid) {
      return false;
    }

    const token = jwt.sign(
      {
        email: stmt.rows[0].email,
        role: stmt.rows[0].role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  static async getUserByEmail(email) {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }

  static async ban(email) {
    const sqlQuery = "UPDATE users SET role_id = 3 WHERE email = $1 RETURNING *";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }

  static async unBan(email) {
    const sqlQuery = "UPDATE users SET role_id = 2 WHERE email = $1 RETURNING *";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }

}

module.exports = User;
