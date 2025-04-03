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

    if (stmt.rows[0].role_id === 3) {
      return "banned"; // User is banned
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

  static async getUserByEmail(data) {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    const parameter = [data.email];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }

  static async ban(data) {
    try {
      const email = data.email; // Extract email from the data object

      // Check if the user exists
      const user = await this.getUserByEmail(data);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's role to "banned" (role_id = 3)
      const sqlQuery =
        "UPDATE users SET role_id = 3 WHERE email = $1 RETURNING *";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

      if (!stmt.rows.length) {
        throw new Error("Failed to ban the user");
      }

      return stmt.rows[0]; // Return the updated user
    } catch (error) {
      throw error; // Re-throw the error for the caller to handle
    }
  }

  static async unBan(data) {
    try {
      const email = data.email; // Extract email from the data object
      // Check if the user exists
      const user = await this.getUserByEmail(data);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's role to "active" (role_id = 2)
      const sqlQuery =
        "UPDATE users SET role_id = 2 WHERE email = $1 RETURNING *";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

      if (!stmt.rows.length) {
        throw new Error("Failed to unban the user");
      }

      return stmt.rows[0]; // Return the updated user
    } catch (error) {
      throw error; // Re-throw the error for the caller to handle
    }
  }
  static async getUserByEmail(email) {
    const sqlQuery = `SELECT * FROM users WHERE email = $1`;
    const stmt = await pool.query(sqlQuery, [email]);
    return stmt.rows[0]; // Retourne un seul utilisateur
  }

  // Mettre à jour un utilisateur par son ID
  static async updateUser(user_id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const sqlQuery = `UPDATE users SET ${setClause} WHERE user_id = $${
      keys.length + 1
    } RETURNING *`;
    const stmt = await pool.query(sqlQuery, [...values, user_id]);
    return stmt.rows[0];
  }
}

module.exports = User;
