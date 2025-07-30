import pool from "../../config/db.js";

class Analisis {
  static async getAllAnalisis() {
    const result = await pool.query("SELECT * FROM analisis");
    return result.rows;
  }

  static async getAnalisisByFolio(folio) {
    const result = await pool.query(
      "SELECT * FROM analisis WHERE folio = $1",
      [folio]
    );
    return result.rows[0];
  }

  static async createAnalisis(data) {
    const { idMuestra, folio, temperatura, desviacion, analista, fechaMuestreo, fechaRecepcion, fechaInicio, fechaTermino} = data;
    const result = await pool.query(
      `INSERT INTO analisis (idMuestra, folio, fechaMuestreo, fechaRecepcion, temperatura, desviacion, analista, fechaInicio, fechaTermino)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [idMuestra, folio, fechaMuestreo, fechaRecepcion, temperatura, desviacion, analista, fechaInicio, fechaTermino]
    );
    return result.rows[0];
  }

  static async updateAnalisis(idAnalisis, data) {
        const { idMuestra, folio, temperatura, desviacion, analista, fechaMuestreo, fechaRecepcion, fechaInicio, fechaTermino } = data;

        const result = await pool.query(
            `UPDATE analisis SET
            idMuestra = $1,
            folio = $2,
            fechaMuestreo = $3,
            fechaRecepcion = $4,
            temperatura = $5,
            desviacion = $6,
            analista = $7,
            fechaInicio = $8,
            fechaTermino = $9
            WHERE idAnalisis = $10
            RETURNING *`, // RETURNING * devuelve el registro actualizado
            [idMuestra, folio, fechaMuestreo, fechaRecepcion, temperatura, desviacion, analista, fechaInicio, fechaTermino, idAnalisis]
        );
        return result.rows[0]; // Retorna el análisis actualizado
    }
}

export default Analisis;
