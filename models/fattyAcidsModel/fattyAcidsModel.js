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

    static async getFattyAcidsByAnalisisId(idAnalisis) {
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

     // Nuevo método: Actualizar un registro de ácidos grasos existente
    static async updateAnalisisAcidosGrasos(idAnalisis, data) {
        const {
            resultadoTrans,
            resultadoSaturadas,
            resultadoMonoinsaturados,
            resultadoPolyinsaturados,
            total,
            acreditacion
        } = data;

        const result = await pool.query(
            `UPDATE analisisacidosgrasos SET
            resultadoTrans = $1,
            resultadoSaturadas = $2,
            resultadoMonoinsaturados = $3,
            resultadoPolyinsaturados = $4,
            total = $5,
            acreditacion = $6
            WHERE idAnalisis = $7
            RETURNING *;`,
            [
                resultadoTrans,
                resultadoSaturadas,
                resultadoMonoinsaturados,
                resultadoPolyinsaturados,
                total,
                acreditacion,
                idAnalisis
            ]
        );
        return result.rows[0];
    }
}

export default FattyAcids;