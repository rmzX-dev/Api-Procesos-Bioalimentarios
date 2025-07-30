import pool from "../../config/db.js";

class Proteins{
    static async createAnalisisProteins(data){
        const { idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisisproteinas (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }

    static async getProteinsByAnalisisId(idAnalisis){
        const result = await pool.query(
            'SELECT * FROM analisisproteinas WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllProteins(){
        const result = await pool.query(
            'SELECT * FROM analisisproteinas'
        );
        return result.rows;
    }

    // Nuevo método: Actualizar un registro de proteínas existente
    static async updateAnalisisProteins(idAnalisis, data) {
        const { resultado, acreditacion } = data;

        const result = await pool.query(
            `UPDATE analisisproteinas SET
            resultado = $1,
            acreditacion = $2
            WHERE idAnalisis = $3
            RETURNING *;`,
            [resultado, acreditacion, idAnalisis]
        );
        return result.rows[0];
    }
}

export default Proteins;