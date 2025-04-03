const { pool } = require("../database/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  /**
   * Registers a new user
   */
  static async register({ username, email, password, birthdate }) {
    try {
      // Check if the user already exists
      const isUser = await this.getUserByEmail(email);
      if (isUser) {
        throw new Error("User already exists");
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert the new user into the database
      const sqlQuery =
        "INSERT INTO users (username, email, password, birthdate, role_id) VALUES ($1, $2, $3, $4, 2) RETURNING *";
      const parameter = [username, email, hashedPassword, birthdate];
      const stmt = await pool.query(sqlQuery, parameter);

      // Generate a JWT token
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
      throw error;
    }
  }

  /**
   * Logs in a user
   */
  static async login({ email, password }) {
    try {
      // Fetch the user by email
      const sqlQuery = "SELECT * FROM users WHERE email = $1";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

      if (!stmt.rows.length) {
        throw new Error("Invalid email or password");
      }

      if (stmt.rows[0].role_id === 3) {
        throw new Error("User is banned");
      }

      const user = stmt.rows[0];

      // Validate the password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Generate a JWT token
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
      const sqlQuery = "SELECT * FROM users WHERE email = $1";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);
      return stmt.rows[0];
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error.message);
      return { message: error.message };
    }
  }

  /**
   * Bans a user by updating their role to "banned" (role_id = 4)
   */
  static async ban(data) {
    try {
      const { email } = data;
      // Check if the user exists
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's role to "banned"
      const sqlQuery =
        "UPDATE users SET role_id = 4 WHERE email = $1 RETURNING *";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

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
  static async unBan(data) {
    try {
      const { email } = data;

      // Check if the user exists
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's role to "active"
      const sqlQuery =
        "UPDATE users SET role_id = 2 WHERE email = $1 RETURNING *";
      const parameter = [email];
      const stmt = await pool.query(sqlQuery, parameter);

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

  static async getByEmail(email) {
    try {
      const sqlQuery = "SELECT user_id FROM users WHERE email = $1";
      const stmt = await pool.query(sqlQuery, [email]);
      if (!stmt.rows.length) {
        throw new Error("User not found");
      }
      return stmt.rows[0];
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error.message);
      return { message: error.message };
    }
  }
}

module.exports = User;
