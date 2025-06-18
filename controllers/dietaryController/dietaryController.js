import DietaryFiber from "../../models/dietaryFiberModel/dietaryFiberModel.js";
class dietaryFiberController {
  static async getAllFiber(req, res) {
    try {
      const data = await DietaryFiber.getAllFibra;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getFiberById(req, res) {
    try {
      const data = await DietaryFiber.getFibraById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Análisis no encontrado" });
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createFiber(req, res) {
    try {
      const data = await DietaryFiber.createAnalisisFibra(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default dietaryFiberController;