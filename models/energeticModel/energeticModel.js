import pool from "../../config/db.js";

class Energetic {
    static async createEnergetic(data) {
        const {
            idAnalisis,
            resultadoKcal,
            resultadoKj,
            azucares,
            azucaresAnidados,
            acreditacion
        } = data;

        const result = await pool.query(
            `INSERT INTO analisisenergetico (
                idAnalisis, resultadoKcal, resultadoKj, azucares, azucaresAnidados, acreditacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [idAnalisis, resultadoKcal, resultadoKj, azucares, azucaresAnidados, acreditacion]
        );

        return result.rows[0];
    }

    static async getEnergeticByAnalisisId(idAnalisis) {
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

    // Nuevo método: Actualizar un registro energético existente
    static async updateEnergetic(idAnalisis, data) {
        const {
            resultadoKcal,
            resultadoKj,
            azucares,
            azucaresAnidados,
            acreditacion
        } = data;

        const result = await pool.query(
            `UPDATE analisisenergetico SET
            resultadoKcal = $1,
            resultadoKj = $2,
            azucares = $3,
            azucaresAnidados = $4,
            acreditacion = $5
            WHERE idAnalisis = $6
            RETURNING *;`,
            [resultadoKcal, resultadoKj, azucares, azucaresAnidados, acreditacion, idAnalisis]
        );
        return result.rows[0];
    }
}

export default Energetic;