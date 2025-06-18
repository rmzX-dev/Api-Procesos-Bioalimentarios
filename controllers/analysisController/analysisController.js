import Analisis from "../../models/analysisModel/analysisModel.js";

class AnalisisController {
  static async getAllAnalisis(req, res) {
    try {
      const data = await Analisis.getAllAnalisis();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAnalisisById(req, res) {
    try {
      const data = await Analisis.getAnalisisById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createAnalisis(req, res) {
    try {
      const data = await Analisis.createAnalisis(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default AnalisisController;
