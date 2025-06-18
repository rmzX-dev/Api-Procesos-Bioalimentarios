import pool from "../../config/db"; 

class Carbohydrates {
    static async createAnalisisCarbs(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisis_carbohidratos (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getCarbsById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisis_carbohidratos WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }
}

export default Carbohydrates;