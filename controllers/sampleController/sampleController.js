import Muestra from "../../models/sampleModel/sampleModel.js";

class MuestraController {
  static async getAllSample(req, res) {
    try {
      const muestras = await Muestra.findAll();
      res.json(muestras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSampleById(req, res) {
    try {
      const muestra = await Muestra.findById(req.params.id);
      if (!muestra) {
        return res.status(404).json({ message: "Muestra no encontrada" });
      }
      res.json(muestra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createSample(req, res) {
    try {
      const muestra = await Muestra.createSample(req.body);
      res.status(201).json(muestra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSample(req, res) {
    try {
      const { id } = req.params;
      const muestra = await Muestra.updateSample(id, req.body);
      
      if (!muestra) {
        return res.status(404).json({ message: "Muestra no encontrada" });
      }
      
      res.status(200).json({
        message: "Muestra actualizada exitosamente",
        muestra: muestra
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteSample(req, res) {
    try {
      const { id } = req.params;
      const muestra = await Muestra.deleteSample(id);
      
      if (!muestra) {
        return res.status(404).json({ message: "Muestra no encontrada" });
      }
      
      res.status(200).json({
        message: "Muestra eliminada exitosamente",
        muestra: muestra
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default MuestraController;
