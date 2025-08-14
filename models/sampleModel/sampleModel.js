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


  static async updateSample(idMuestra, data) {
        const { idCliente, descripcion } = data; // O más campos si los tienes

        const result = await pool.query(
            `UPDATE muestra SET
            idCliente = $1,
            descripcion = $2
            WHERE idMuestra = $3
            RETURNING *;`,
            [
                idCliente,
                descripcion,
                idMuestra
            ]
        );
        return result.rows[0]; // Devuelve la muestra actualizada
    }

    static async getSampleByClienteAndDescription(idCliente, descripcion) {
        const result = await pool.query(
            "SELECT * FROM muestra WHERE idCliente = $1 AND descripcion = $2",
            [idCliente, descripcion]
        );
        return result.rows[0];
    }

    static async deleteSample(idMuestra) {
        const result = await pool.query(
            `DELETE FROM muestra 
            WHERE idMuestra = $1 
            RETURNING *;`,
            [idMuestra]
        );
        return result.rows[0];
    }

}

export default Muestra;
