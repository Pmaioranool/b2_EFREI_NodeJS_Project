// TODO : a faire
import pool from '../database/database.js';

class MP {

    static async getMP(){
        const sqlQuery = "select * from MP";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getMPById(id){
        const sqlQuery = "select * from MP where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async createMP(name){
        const sqlQuery = "insert into MP (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updateMP(id, name){
        const sqlQuery = "update MP set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deleteMP(id){
        const sqlQuery = "delete from MP where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }
}