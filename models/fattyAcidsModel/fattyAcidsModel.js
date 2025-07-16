import pool from "../../config/db.js";

class FattyAcids {
    static async createAnalisisAcidosGrasos(data) {
        const {
            idAnalisis,
            resultadoTrans,
            resultadoSaturadas,
            resultadoMonoinsaturados,
            resultadoPolyinsaturados,
            total,
            acreditacion
        } = data;

        const result = await pool.query(
            `INSERT INTO analisisacidosgrasos (
                idAnalisis, resultadoTrans, resultadoSaturadas, resultadoMonoinsaturados,
                resultadoPolyinsaturados, total, acreditacion
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                idAnalisis, resultadoTrans, resultadoSaturadas, resultadoMonoinsaturados,
                resultadoPolyinsaturados, total, acreditacion
            ]
        );

        return result.rows[0];
    }

    static async getAcidosGrasosById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisisacidosgrasos WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllAcidos(){
        const result = await pool.query(
            'SELECT * FROM analisisacidosgrasos'
        );
        return result.rows;
    }
}

export default FattyAcids;