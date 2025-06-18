import pool from "../../config/db";

class Energetic {
    static async createAnalisisEnergetico(data) {
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
            `INSERT INTO analisis_energetico (
                idAnalisis, resultadoKcal, resultadoKj, unidadKcal, unidadKj, metodoReferencia, acreditacion
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [idAnalisis, resultadoKcal, resultadoKj, unidadKcal, unidadKj, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getEnergeticoById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisis_energetico WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }
}

export default Energetic;