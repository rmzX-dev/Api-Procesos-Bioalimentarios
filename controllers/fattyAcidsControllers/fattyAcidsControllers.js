import FattyAcids from "../../models/fattyAcidsModel/fattyAcidsModel.js";
class fattyAcidsController {
  static async getAllAcids(req, res) {
    try {
      const data = await FattyAcids.getAllAcidos;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAcidsById(req, res) {
    try {
      const data = await FattyAcids.getAcidosGrasosById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createAcids(req, res) {
    try {
      const data = await FattyAcids.createAnalisisAcidosGrasos(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default fattyAcidsController;