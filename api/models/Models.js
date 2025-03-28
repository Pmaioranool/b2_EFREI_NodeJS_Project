const {pool} = require("../database/database.js");

class Model {
  static async getAll(model){
        const sqlQuery = `select * from ${model}`;
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getGroupeById(model, id){
        const sqlQuery = "select * from Groupes where id = $2";
        const stmt = await pool.query(sqlQuery, [model,id]);
        return stmt.rows;
    }

    static async createGroupe(model, name){
        const sqlQuery = "insert into $1 (name) values ($2)";
        const stmt = await pool.query(sqlQuery, [model,name]);
        return stmt;
    }

    static async updateGroupe(model, id, name){
        const sqlQuery = "update $1 set name = $2 where id = $3";
        const stmt = await pool.query(sqlQuery, [model,name, id]);
        return stmt;
    }

    static async deleteGroupe(model, id){
        const sqlQuery = "delete from $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [model,id]);
        return stmt;
    }
}

module.exports = Model;