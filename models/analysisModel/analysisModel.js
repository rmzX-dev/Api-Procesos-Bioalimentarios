import pool from "../../config/db.js";

class Analisis {
  static async getAllAnalisis() {
    const result = await pool.query("SELECT * FROM analisis");
    return result.rows;
  }

  static async getAnalisisById(id) {
    const result = await pool.query(
      "SELECT * FROM analisis WHERE idAnalisis = $1",
      [id]
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
}

export default Analisis;
