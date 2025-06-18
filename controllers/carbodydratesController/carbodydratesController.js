import Carbohydrates from "../../models/carbohydratesModel/carbohydratesModel.js";
class carbohydratesController {
  static async getAllCarbs(req, res) {
    try {
      const data = await Carbohydrates.getAllCarbs;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getCarbsById(req, res) {
    try {
      const data = await Carbohydrates.getCarbsById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createCarbs(req, res) {
    try {
      const data = await Carbohydrates.createAnalisisCarbs(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default carbohydratesController;