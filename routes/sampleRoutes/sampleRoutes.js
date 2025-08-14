import express from "express";
import MuestraController from "../../controllers/sampleController/sampleController.js";

const router = express.Router();

router.get("/muestra", MuestraController.getAllSample);
router.get("/muestra/:id", MuestraController.getSampleById);
router.post("/muestra", MuestraController.createSample);
router.put("/muestra/:id", MuestraController.updateSample);
router.delete("/muestra/:id", MuestraController.deleteSample);

export default router;
