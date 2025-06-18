import Energetic from "../../models/energeticModel/energeticModel.js";
class energeticController {
  static async getAllEnergetic(req, res) {
    try {
      const data = await Energetic.getAllEnergetic;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getEnergeticById(req, res) {
    try {
      const data = await Energetic.getEnergeticById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createEnergetic(req, res) {
    try {
      const data = await Energetic.createEnergetic(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default energeticController;