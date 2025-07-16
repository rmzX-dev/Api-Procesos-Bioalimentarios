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

    static async getProteinsById(idAnalisis){
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
}

export default Proteins;