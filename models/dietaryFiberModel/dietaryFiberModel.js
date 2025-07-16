import pool from "../../config/db.js"; 

class DietaryFiber {
    static async createAnalisisFibra(data) {
        const { idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisisfibradietetica (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }

    static async getFibraById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisisfibradietetica WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllFibra(){
        const result = await pool.query(
            'SELECT * FROM analisisfibradietetica'
        );
        return result.rows;
    }
}

export default DietaryFiber;