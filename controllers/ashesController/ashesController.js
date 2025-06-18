import Ashes from "../../models/ashesModel/ashesModel.js";

class AshesController {
  static async getAllAshes(req, res) {
    try {
      const data = await Ashes.getAllAshes();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAshesById(req, res) {
    try {
      const data = await Ashes.getAshesById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createAshes(req, res) {
    try {
      const data = await Ashes.createAshes(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default AshesController;
