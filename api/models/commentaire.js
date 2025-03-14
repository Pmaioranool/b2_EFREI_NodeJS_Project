// TODO : a faire
import pool from '../database/database.js';

class Comments {

    static async getComments(){
        const sqlQuery = "select * from Comments";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getCommentById(id){
        const sqlQuery = "select * from Comments where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async createComment(name){
        const sqlQuery = "insert into Comments (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updateComment(id, name){
        const sqlQuery = "update Comments set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deleteComment(id){
        const sqlQuery = "delete from Comments where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }
}