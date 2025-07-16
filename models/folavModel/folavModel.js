import pool from "../../config/db.js";

class Folav{
    static async createFolav(data) {
        const {idAnalisis, fechaGeneracion } = data;

        const result = await pool.query(
            `INSERT INTO folav (idAnalisis, fechaGeneracion)
             VALUES ($1, $2) RETURNING *`,
            [idAnalisis, fechaGeneracion]
        );

        return result.rows[0];
    }
}

export default Folav;