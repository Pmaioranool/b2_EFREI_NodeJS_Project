// TODO : a faire
const {pool} = require("../database/database.js");

class Groupes {

    static async getGroupes(){
        const sqlQuery = "select * from Groupes";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getGroupeById(id){
        const sqlQuery = "select * from Groupes where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getGroupesByCategory(categoryId) {
        const sqlQuery = "SELECT * FROM groupes WHERE categories_id = $1";
        const stmt = await pool.query(sqlQuery, [categoryId]);
        return stmt.rows;
    }

    static async createGroupe(name){
        const sqlQuery = "insert into Groupes (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updateGroupe(id, name){
        const sqlQuery = "update Groupes set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deleteGroupe(id){
        const sqlQuery = "delete from Groupes where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }
}

module.exports = Groupes;
