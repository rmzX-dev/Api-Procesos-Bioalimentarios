import pool from '../../config/db.js';

class Cliente {
  static async getClientes() {
    const result = await pool.query('SELECT * FROM clientes');
    return result.rows;
  }

  static async getClienteById(idCliente) {
    const result = await pool.query(
      'SELECT * FROM clientes WHERE idcliente = $1',
      [idCliente]
    );
    return result.rows[0];
  }

  static async createCliente(data) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      razonSocial,
      direccion,
      telefono,
      metodo,
      acreditacion
    } = data;

    const result = await pool.query(
      `INSERT INTO clientes 
      (nombre, apellidoPaterno, apellidoMaterno, razonSocial, direccion, telefono, metodo, acreditacion)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;`,
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        razonSocial,
        direccion,
        telefono,
        metodo,
        acreditacion
      ]
    );

    return result.rows[0];
  }

  static async updateCliente(idCliente, data) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      razonSocial,
      direccion,
      telefono,
      metodo,
      acreditacion
    } = data;

    const result = await pool.query(
      `UPDATE clientes SET 
      nombre = $1, apellidoPaterno = $2, apellidoMaterno = $3, razonSocial = $4,
      direccion = $5, telefono = $6, metodo = $7, acreditacion = $8
      WHERE idcliente = $9 RETURNING *;`,
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        razonSocial,
        direccion,
        telefono,
        metodo,
        acreditacion,
        idCliente
      ]
    );

    return result.rows[0];
  }

  static async deleteCliente(idCliente) {
    const result = await pool.query(
      'DELETE FROM clientes WHERE idcliente = $1 RETURNING *;',
      [idCliente]
    );
    return result.rows[0];
  }
}

export default Cliente;
