import pool from "../../config/db.js"; 

class Sodium {
    static async createAnalisisSodium(data) {
        const { idAnalisis, resultado, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisissodio (idAnalisis, resultado, acreditacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [idAnalisis, resultado, acreditacion]
        );

        return result.rows[0];
    }

    static async getSodiumByAnalisisId(idAnalisis) {
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

    // Nuevo método: Actualizar un registro de sodio existente
    static async updateAnalisisSodium(idAnalisis, data) {
        const { resultado, acreditacion } = data;

        const result = await pool.query(
            `UPDATE analisissodio SET
            resultado = $1,
            acreditacion = $2
            WHERE idAnalisis = $3
            RETURNING *;`,
            [resultado, acreditacion, idAnalisis]
        );
        return result.rows[0];
    }
}

export default Sodium;