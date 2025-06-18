import pool from "../../config/db";

class Mouisture {
    static async createAnalisisHumedad(data) {
        const { idAnalisis, resultado, unidad, metodoReferencia, acreditacion } = data;

        const result = await pool.query(
            `INSERT INTO analisis_humedad (idAnalisis, resultado, unidad, metodoReferencia, acreditacion)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idAnalisis, resultado, unidad, metodoReferencia, acreditacion]
        );

        return result.rows[0];
    }

    static async getMoistureById(idAnalisis){
        const result = await pool.query(
            'SELECT * FROM analisis_humedad WHERE idAnalisis = $1',
            [idAnalisis]
        );
        return result.rows[0];
    }

    static async getAllMoisture(){
        const result = await pool.query(
            'SELECT * FROM analisis_humedad'
        )
        return result.rows;
    }
}


export default Mouisture;