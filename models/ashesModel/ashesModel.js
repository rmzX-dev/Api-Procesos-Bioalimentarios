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


    static async getAshesById(idAnalisis){
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
}

export default Ashes;