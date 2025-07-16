import pool from "../../config/db.js";

class Moisture {
    static async createMoisture(data) {
        const {idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisishumedad (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }

    static async getMoistureById(idAnalisis){
        const result = await pool.query(
            'SELECT * FROM analisishumedad WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }
}

export default Moisture;