import pool from "../../config/db.js";

class Energetic {
    static async createEnergetic(data) {
        const {
            idAnalisis,
            resultadoKcal,
            resultadoKj,
            unidadKcal,
            unidadKj,
            metodoReferencia,
            acreditacion
        } = data;

        const result = await pool.query(
            `INSERT INTO analisisenergetico (
                idAnalisis, resultadoKcal, resultadoKj, unidadKcal, unidadKj, metodoReferencia, acreditacion
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [idAnalisis, resultadoKcal, resultadoKj, unidadKcal, unidadKj, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getEnergeticById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisisenergetico WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllEnergetic(){
        const result = await pool.query(
            'SELECT * FROM analisisenergetico'
        );
        return result.rows;
    }
}

export default Energetic;