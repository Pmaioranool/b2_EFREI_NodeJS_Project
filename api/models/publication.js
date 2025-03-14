<<<<<<< HEAD
import pool from '../database/database.js';

class Publications {

    static async getPublications(){
        const sqlQuery = "select * from Publications";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getPublicationById(id){
        const sqlQuery = "select * from Publications where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async createPublication(name){
        const sqlQuery = "insert into Publications (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updatePublication(id, name){
        const sqlQuery = "update Publications set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deletePublication(id){
        const sqlQuery = "delete from Publications where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }
}
=======
const publications = [];

class Publication {
  static async getAllPublications() {
    return publications;
  }

  static async getPublicationById(id) {
    return publications.find((pub) => pub.id === id) || null;
  }

  static async createPublication(data) {
    const newPublication = { id: publications.length + 1, ...data };
    publications.push(newPublication);
    return newPublication;
  }

  static async updatePublication(id, data) {
    const index = publications.findIndex((pub) => pub.id == id);
    if (index === -1) return null;
    publications[index] = { ...publications[index], ...data };
    return publications[index];
  }

  static async deletePublication(id) {
    const index = publications.findIndex((pub) => pub.id == id);
    if (index === -1) return null;
    return publications.splice(index, 1);
  }
}

module.exports = Publication;
>>>>>>> 609808e8c008421ce923c29f3e171ca72adf68e5
