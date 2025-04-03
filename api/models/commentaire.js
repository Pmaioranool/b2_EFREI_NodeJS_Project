// TODO : a faire
const {pool} = require("../database/database.js");

class Comments {

    static async getByUser(id){
        const sqlQuery = "select * from Comments inner join users where user_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getByRoles(id){
        const sqlQuery = "select * from Comments inner join roles where role_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getByPublication(id){
        const sqlQuery = "select * from Comments where publication_id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async getCommentsByDate(){
        const sqlQuery = "select * from Comments order by date";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

}

module.exports = Comments;
