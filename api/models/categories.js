const {pool} = require("../database/database.js");


class categories {

    static async getCategories(){
        const sqlQuery = "select * from categories";
        const stmt = await pool.query(sqlQuery);
        return stmt.rows;
    }

    static async getCategoryById(id){
        const sqlQuery = "select * from categories where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt.rows;
    }

    static async createCategory(name){
        const sqlQuery = "insert into categories (name) values ($1)";
        const stmt = await pool.query(sqlQuery, [name]);
        return stmt;
    }

    static async updateCategory(id, name){
        const sqlQuery = "update categories set name = $1 where id = $2";
        const stmt = await pool.query(sqlQuery, [name, id]);
        return stmt;
    }

    static async deleteCategory(id){
        const sqlQuery = "delete from categories where id = $1";
        const stmt = await pool.query(sqlQuery, [id]);
        return stmt;
    }

    static async getSubcategories(id){
        const sqlQuery = "select * from categories where parent = $1";
        const stmt = await pool.query(sqlQuery,[id]);
        return stmt.rows;
    }

}
