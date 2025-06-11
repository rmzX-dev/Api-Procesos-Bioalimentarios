import Muestra from "../models/sampleModel.js";

class MuestraController {
  static async getAll(req, res) {
    try {
      const muestras = await Muestra.findAll();
      res.json(muestras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
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

  static async create(req, res) {
    try {
      const muestra = await Muestra.create(req.body);
      res.status(201).json(muestra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const muestra = await Muestra.update(req.params.id, req.body);
      if (!muestra) {
        return res.status(404).json({ message: "Muestra no encontrada" });
      }
      res.json(muestra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const muestra = await Muestra.delete(req.params.id);
      if (!muestra) {
        return res.status(404).json({ message: "Muestra no encontrada" });
      }
      res.json(muestra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default MuestraController;
