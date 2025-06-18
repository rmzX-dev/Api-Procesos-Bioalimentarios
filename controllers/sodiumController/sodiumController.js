import Sodium from "../../models/sodiumModel/sodiumModel.js";
class sodiumController {
  static async getAllSodium(req, res) {
    try {
      const data = await Sodium.getSodiumById;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSodiumById(req, res) {
    try {
      const data = await Sodium.getSodiumById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createSodium(req, res) {
    try {
      const data = await Sodium.createAnalisisSodium(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default sodiumController;