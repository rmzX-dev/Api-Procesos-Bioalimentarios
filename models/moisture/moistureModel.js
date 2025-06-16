import pool from "../../config/db";

class Mouisture {
    static async createAnalisisHumedad(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisis_humedad (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }
}


export default Mouisture;