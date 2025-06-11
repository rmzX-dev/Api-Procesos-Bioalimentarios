import pool from "../config/db.js";

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
    const { idMuestra, idAnalista, tipoAnalisis, resultado, unidad } = data;
    const result = await pool.query(
      `INSERT INTO analisis (idMuestra, idAnalista, tipoAnalisis, resultado, unidad)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [idMuestra, idAnalista, tipoAnalisis, resultado, unidad]
    );
    return result.rows[0];
  }

  static async updateAnalisis(id, data) {
    const { idMuestra, idAnalista, tipoAnalisis, resultado, unidad } = data;
    const result = await pool.query(
      `UPDATE analisis SET idMuestra = $1, idAnalista = $2, tipoAnalisis = $3,
       resultado = $4, unidad = $5 WHERE idAnalisis = $6 RETURNING *`,
      [idMuestra, idAnalista, tipoAnalisis, resultado, unidad, id]
    );
    return result.rows[0];
  }

  static async deleteAnalisis(id) {
    const result = await pool.query(
      "DELETE FROM analisis WHERE idAnalisis = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

export default Analisis;
