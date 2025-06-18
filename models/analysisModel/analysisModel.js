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
    const { idMuestra, tipo } = data;
    const result = await pool.query(
      `INSERT INTO analisis (idMuestra, tipo)
       VALUES ($1, $2) RETURNING *`,
      [idMuestra, tipo]
    );
    return result.rows[0];
  }
}

export default Analisis;
