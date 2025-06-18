import pool from "../../config/db";

class Ashes{
    static async createAnalisisAshes(data){
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisis_cenizas (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }


    static async getAshesById(idAnalisis){
        const result = await pool.query(
            'SELECT * FROM analisis_cenizas WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }
}

export default Ashes;