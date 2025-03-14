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

    static async getCommentsByUser(id){
        const sqlQuery = "select * from Comments inner join users where user_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getCommentsByRoles(id){
        const sqlQuery = "select * from Comments inner join roles where role_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getCommentsByPublication(id){
        const sqlQuery = "select * from Comments inner join publications where publication_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getCommentsByComment(id){
        const sqlQuery = "select * from Comments inner join Comments where comment_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getCommentsByDate(){
        const sqlQuery = "select * from Comments order by date";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

}