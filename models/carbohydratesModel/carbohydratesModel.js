import pool from "../../config/db.js"; 

class Carbohydrates {
    static async createAnalisisCarbs(data) {
        const { idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisiscarbohidratos (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }

    static async getCarbsById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisiscarbohidratos WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllCarbs(){
        const result = await pool.query(
            'SELECT * FROM analisiscarbohidratos'
        );
        return result.rows;
    }
}

export default Carbohydrates;