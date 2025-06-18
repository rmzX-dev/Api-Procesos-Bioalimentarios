import Mouisture from "../../models/moistureModel/moistureModel.js";
class mouistureController {
  static async getAllMouisture(req, res) {
    try {
      const data = await Mouisture.getAllMoisture;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getMouistureById(req, res) {
    try {
      const data = await Mouisture.getMoistureById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createMoisture(req, res) {
    try {
      const data = await Mouisture.createAnalisisHumedad(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default mouistureController;