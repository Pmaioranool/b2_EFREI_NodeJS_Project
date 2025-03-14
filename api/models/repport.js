// TODO : a faire

const {pool} = require("../database/database.js");

class Repports {

    static async getRepports(){
        const sqlQuery = "select * from Repports";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getRepportById(id){
        const sqlQuery = "select * from Repports where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async createRepport(name){
        const sqlQuery = "insert into Repports (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updateRepport(id, name){
        const sqlQuery = "update Repports set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deleteRepport(id){
        const sqlQuery = "delete from Repports where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }
}