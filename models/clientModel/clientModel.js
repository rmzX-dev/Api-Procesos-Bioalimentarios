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
      razonSocial,
      direccion
    } = data;

    const result = await pool.query(
      `INSERT INTO clientes 
      (razonSocial, direccion)
      VALUES ($1, $2)
      RETURNING *;`,
      [
        razonSocial,
        direccion
      ]
    );

    return result.rows[0];
  }

}

export default Cliente;
