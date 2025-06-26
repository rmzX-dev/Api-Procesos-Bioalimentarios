import pool from "../../config/db.js"; 

class Sodium {
    static async createAnalisisSodium(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisissodio (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getSodiumById(idAnalisis) {
        const result = await pool.query(
            'SELECT * FROM analisissodio WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllSodium() {
        const result = await pool.query(
            'SELECT * FROM analisissodio'
        );
        return result.rows;
    }
}

export default Sodium;