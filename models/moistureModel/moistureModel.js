import pool from "../../config/db.js";

class Moisture {
    static async createAnalisisHumedad(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisishumedad (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
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

    static async getAllMoisture(){
        const result = await pool.query(
            'SELECT * FROM analisishumedad'
        );
        return result.rows;
    }
}

export default Moisture;