import Proteins from "../../models/proteinsModel/proteinsModel";
class proteinsController {
  static async getAllProteins(req, res) {
    try {
      const data = await Proteins.getAllProteins;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProteinsById(req, res) {
    try {
      const data = await Proteins.getProteinsById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createProteins(req, res) {
    try {
      const data = await Proteins.createAnalisisProteins(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default proteinsController;