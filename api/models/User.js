const { pool } = require("../database/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  /**
   * Registers a new user
   */
  static async register({ username, email, password, birthdate }) {
    try {
      const isUser = await this.getUserByEmail(email);
      if (isUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const sqlQuery =
        "INSERT INTO users (username, email, password, birthdate, role_id) VALUES ($1, $2, $3, $4, 2) RETURNING *";
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

      console.log(`User ${username} registered successfully.`);
      return { token, user: stmt.rows[0] };
    } catch (error) {
      console.error("Error registering user:", error.message);
      return { message: error.message };
    }
  }

  /**
   * Logs in a user
   */
  static async login({ email, password }) {
    try {
      const sqlQuery = "SELECT * FROM users WHERE email = $1";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

      if (!stmt.rows.length) {
        throw new Error("Invalid email or password");
      }

      const user = stmt.rows[0];

      if (user.role_id === 3) {
        throw new Error("User is banned");
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role_id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log(`User ${email} logged in successfully.`);
      return { token, user };
    } catch (error) {
      console.error("Error logging in user:", error.message);
      return { message: error.message };
    }
  }

  /**
   * Fetches a user by email
   */
  static async getUserByEmail(email) {
    try {
      // console.log(`Recherche de l'utilisateur avec l'email : ${email}`);
      const sqlQuery = "SELECT * FROM users WHERE email = $1";
      const stmt = await pool.query(sqlQuery, [email]);

      if (stmt.rows.length === 0) {
        // console.log("Aucun utilisateur trouvé avec cet email.");
        return null; // Retourne explicitement null si aucun utilisateur n'est trouvé
      }

      // console.log("Utilisateur trouvé :", stmt.rows[0]);
      return stmt.rows[0];
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur :`,
        error.message
      );
      return { message: error.message };
    }
  }

  /**
   * Bans a user by updating their role to "banned" (role_id = 3)
   */
  static async ban(email) {
    try {
      const user = await this.getUserByEmail(email);

      if (!user || user.role_id === 2) {
        throw new Error("User not found");
      }

      const banID = 4; // ID for banned users
      if (user.role_id === banID) {
        throw new Error("already banned");
      }
      const sqlQuery =
        "UPDATE users SET role_id = 4 WHERE email = $1 RETURNING *";
      const stmt = await pool.query(sqlQuery, [email]);

      if (!stmt.rows.length) {
        throw new Error("Failed to ban the user");
      }

      console.log(`User with email ${email} has been banned.`);
      return stmt.rows[0];
    } catch (error) {
      console.error(`Error banning user with email ${email}:`, error.message);
      return { message: error.message };
    }
  }

  /**
   * Unbans a user by updating their role to "active" (role_id = 2)
   */
  static async unBan(email) {
    try {
      const user = await this.getUserByEmail(email);

      if (!user || user == null) {
        throw new Error("User not found");
      }

      const banID = 4; // ID for banned users
      if (user.role_id !== banID) {
        throw new Error("already unbanned");
      }

      const sqlQuery =
        "UPDATE users SET role_id = 2 WHERE email = $1 RETURNING *";
      const stmt = await pool.query(sqlQuery, [email]);

      if (!stmt.rows.length) {
        throw new Error("Failed to unban the user");
      }

      console.log(`User with email ${email} has been unbanned.`);
      return stmt.rows[0];
    } catch (error) {
      console.error(`Error unbanning user with email ${email}:`, error.message);
      return { message: error.message };
    }
  }

  /**
   * Updates a user's profile by their ID
   */
  static async updateUser(user_id, data) {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      const sqlQuery = `UPDATE users SET ${setClause} WHERE user_id = $${
        keys.length + 1
      } RETURNING *`;
      const stmt = await pool.query(sqlQuery, [...values, user_id]);

      if (!stmt.rows.length) {
        throw new Error("Failed to update the user");
      }

      console.log(`User with ID ${user_id} has been updated.`);
      return stmt.rows[0];
    } catch (error) {
      console.error(`Error updating user with ID ${user_id}:`, error.message);
      return { message: error.message };
    }
  }

  /**
   * Fetches a user's role by their ID
   */
  static async getRole(user_id) {
    try {
      const sqlQuery = "SELECT role_id FROM users WHERE user_id = $1";
      const stmt = await pool.query(sqlQuery, [user_id]);
      return stmt.rows[0];
    } catch (error) {
      console.error(
        `Error fetching role for user ID ${user_id}:`,
        error.message
      );
      return { message: error.message };
    }
  }

  static async getByEmail(user_id) {}
}

module.exports = User;
