import pool from "../../config/db.js";

class FattyAcids {
    static async createAnalisisAcidosGrasos(data) {
        const {
            idAnalisis,
            resultado,
            unidad,
            metodoReferencia,
            acreditacion,
            resultadoTrans,
            resultadoSaturadas,
            resultadoMonoinsaturados,
            resultadoPolyinsaturados,
            total
        } = data;

        const result = await pool.query(
            `INSERT INTO analisisacidosgrasos (
                idAnalisis, resultado, unidad, metodoReferencia, acreditacion,
                resultadoTrans, resultadoSaturadas, resultadoMonoinsaturados,
                resultadoPolyinsaturados, total
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                idAnalisis, resultado, unidad, metodoReferencia, acreditacion,
                resultadoTrans, resultadoSaturadas, resultadoMonoinsaturados,
                resultadoPolyinsaturados, total
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