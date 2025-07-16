import pool from "../../config/db.js";

class Muestra {
  static async findAll() {
    const result = await pool.query("SELECT * FROM muestra");
    return result.rows;
  }

  static async findById(idMuestra) {
    const result = await pool.query(
      "SELECT * FROM muestra WHERE idMuestra = $1",
      [idMuestra]
    );
    return result.rows[0];
  }

  static async createSample(data) {
    const {
      idCliente,
      descripcion
    } = data;

    const result = await pool.query(
      `INSERT INTO muestra (
        idCliente, descripcion
      ) VALUES ($1, $2)
      RETURNING *`,
      [
        idCliente,
        descripcion
      ]
    );
    return result.rows[0];
  }


}

export default Muestra;
