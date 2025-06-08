const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

class User {
  static async findUser() {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows[0];
  }

  static async findUserById(id_usuario) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id_usuario]
    );
    return result.rows[0];
  }

  static async createUser(data) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      correo,
      contrasenia,
      telefono,
    } = data;
    const hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, correo, contrasenia, telefono) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        correo,
        hashedPassword,
        telefono,
      ]
    );
    return result.rows[0];
  }

  static async updateUser(id_usuario, data) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      correo,
      contrasenia,
      telefono,
    } = data;
    let hashedPassword = contrasenia;
    if (contrasenia) {
      hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
    }
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, apellidoPaterno = $2, apellidoMaterno = $3, fechaNacimiento = $4, correo = $5, contrasenia = $6, telefono = $7 WHERE id_usuario = $8 RETURNING *;",
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        correo,
        hashedPassword,
        telefono,
        id_usuario,
      ]
    );
    return result.rows[0];
  }

  static async loginUser(data) {
    const { correo, contrasenia } = data;

    try {
      const result = await pool.query(
        "SELECT * FROM usuarios WHERE correo = $1",
        [correo]
      );

      if (result.rows.length === 0) {
        return { status: 400, message: "Usuario no encontrado" };
      }

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);

      if (!isMatch) {
        return { status: 400, message: "Contraseña incorrecta" };
      }

      const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        status: 200,
        message: "Login exitoso",
        token,
        user: { id: user.id_usuario, correo: user.correo, rol: user.id_rol },
      };
    } catch (error) {
      console.error("Error en loginUser:", error);
      return { status: 500, message: "Error del servidor" };
    }
  }
}

module.exports = User;
