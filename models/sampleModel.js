import pool from "../config/db.js";

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

  static async create(data) {
    const {
      idCliente,
      folio,
      descripcion,
      fechaMuestreo,
      fechaRecepcion,
      temperatura,
    } = data;

    const result = await pool.query(
      `INSERT INTO muestra (
        idCliente, folio, descripcion, fechaMuestreo, fechaRecepcion, temperatura
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        idCliente,
        folio,
        descripcion,
        fechaMuestreo,
        fechaRecepcion,
        temperatura,
      ]
    );

    return result.rows[0];
  }

  static async update(idMuestra, data) {
    const {
      idCliente,
      folio,
      descripcion,
      fechaMuestreo,
      fechaRecepcion,
      temperatura,
    } = data;

    const result = await pool.query(
      `UPDATE muestra SET 
        idCliente = $1, folio = $2, descripcion = $3,
        fechaMuestreo = $4, fechaRecepcion = $5, temperatura = $6
      WHERE idMuestra = $7 RETURNING *`,
      [
        idCliente,
        folio,
        descripcion,
        fechaMuestreo,
        fechaRecepcion,
        temperatura,
        idMuestra,
      ]
    );

    return result.rows[0];
  }

  static async delete(idMuestra) {
    const result = await pool.query(
      "DELETE FROM muestra WHERE idMuestra = $1 RETURNING *",
      [idMuestra]
    );
    return result.rows[0];
  }
}

export default Muestra;
