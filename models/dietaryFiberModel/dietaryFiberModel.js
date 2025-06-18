import pool from "../../config/db"; 

class DietaryFiber {
    static async createAnalisisFibra(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisis_fibra_dietetica (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getFibraById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisis_fibra_dietetica WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllFibra(){
        const result = await pool.query(
            'SELECT * FROM analisis_fibra_dietetica'
        )
    }
}

export default DietaryFiber;