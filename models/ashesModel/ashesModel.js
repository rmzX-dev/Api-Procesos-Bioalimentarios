import pool from "../../config/db.js";

class Ashes{
    static async createAnalisisAshes(data){
        const { idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisiscenizas (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }


    static async getAshesByAnalisisId(idAnalisis){
        const result = await pool.query(
            'SELECT * FROM analisiscenizas WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllAshes () {
        const result = await pool.query(
            'SELECT * FROM analisiscenizas'
        );
        return result.rows;
    }

    // Nuevo método: Actualizar un registro de cenizas existente
    static async updateAnalisisAshes(idAnalisis, data) {
        const { resultado, acreditacion } = data;
        const result = await pool.query(
            `UPDATE analisiscenizas SET
            resultado = $1,
            acreditacion = $2
            WHERE idAnalisis = $3
            RETURNING *;`,
            [resultado, acreditacion, idAnalisis]
        );
        return result.rows[0];
    }
}

export default Ashes;