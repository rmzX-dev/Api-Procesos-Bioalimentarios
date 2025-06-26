import User from "../../models/userModel/userModel.js";

class UserController {
  static async findAllUsers(req, res) {
    try {
      const users = await User.findUser();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await User.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found or already deleted" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async loginUser(req, res) {
    const { correo, contrasenia } = req.body;

    if (!correo || !contrasenia) {
      return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    try {
      const result = await User.loginUser({ correo, contrasenia });
      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error en loginUser controller:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async logoutUser(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
      const result = await User.logoutUser(token);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error en logoutUser controller:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found or already deleted" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
