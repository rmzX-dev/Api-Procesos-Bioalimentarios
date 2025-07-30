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

    static async getCarbsByAnalisisId(idAnalisis) {
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


     // Nuevo método: Actualizar un registro de carbohidratos existente
    static async updateAnalisisCarbs(idAnalisis, data) {
        const { resultado, acreditacion } = data;
        const result = await pool.query(
            `UPDATE analisiscarbohidratos SET
            resultado = $1,
            acreditacion = $2
            WHERE idAnalisis = $3
            RETURNING *;`,
            [resultado, acreditacion, idAnalisis]
        );
        return result.rows[0];
    }
}

export default Carbohydrates;