import pool from "../database/database.js";

class User {
  static async register({ username, email, password, birthdate }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sqlQuery =
      "insert into users (username, email, password, birthdate, role_id) values ($1, $2, $3, $4, 2);";
    const parameter = [username, email, hashedPassword, birthdate];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }

  static async login({ email, password }) {
    const sqlQuery = "select * from users where email = $1";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    if (!stmt.rows.length) {
      return null;
    }

    const isPasswordValid = brcypt.compareSync(password, stmt.row[0].password);
    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      {
        email: stmt.row[0].email,
        role: stmt.row[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  static async getUserByEmail(email) {
    const sqlQuery = "select * from users where email = $1";
    const parameter = [email];
    const stmt = await pool.query(sqlQuery, parameter);
    return stmt.rows[0];
  }
}

module.exports = Book;
