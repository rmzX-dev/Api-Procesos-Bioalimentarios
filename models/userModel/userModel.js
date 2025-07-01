import pool from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

class User {
  static async findUser() {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
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
      correo,
      contrasenia,
      telefono,
    } = data;
    const hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        hashedPassword,
        telefono,
      ]
    );
    return result.rows[0];
  }

  static async updateUser(idusuario, data) {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasenia,
      telefono,
    } = data;

    let hashedPassword;
    if (contrasenia) {
      hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
    } else {
      const currentUser = await pool.query(
        "SELECT contrasenia FROM usuarios WHERE idusuario = $1",
        [idusuario]
      );
      if (currentUser.rows.length === 0) {
        throw new Error("User not found");
      }
      hashedPassword = currentUser.rows[0].contrasenia;
    }

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !telefono) {
      throw new Error("Faltan campos obligatorios para actualizar");
    }

    const result = await pool.query(
      `UPDATE usuarios SET
      nombre = $1,
      apellidoPaterno = $2,
      apellidoMaterno = $3,
      correo = $4,
      contrasenia = $5,
      telefono = $6
    WHERE idusuario = $7
    RETURNING *;`,
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        hashedPassword,
        telefono,
        idusuario,
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found or already deleted");
    }

    return result.rows[0];
  }

  static async deleteUser(id_usuario) {
    const result = await pool.query(
      "DELETE FROM usuarios WHERE idUsuario = $1 RETURNING *;",
      [id_usuario]
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
        user: { id: user.id_usuario, correo: user.correo /* rol: user.id_rol (if you have) */ },
      };
    } catch (error) {
      console.error("Error en loginUser:", error);
      return { status: 500, message: "Error del servidor" };
    }
  }
}

export default User;
