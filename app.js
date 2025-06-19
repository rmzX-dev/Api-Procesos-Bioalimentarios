import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analysisRoutes from "./routes/analysisRoutes/analysisRoutes.js";
import ashesRoutes from "./routes/ashesRoutes/ashesRoutes.js";
import carbohydratesRoutes from "./routes/carbohydratesRoutes/carbohydratesRoutes.js";
import clientRoutes from "./routes/clientRoutes/clientRoutes.js";
import dietaryRoutes from "./routes/dietaryFiberRoutes/dietaryFiberRoutes.js";
import energeticsRoutes from "./routes/energeticRoutes/energeticRoutes.js";
import fattyAcidsRoutes from "./routes/fattyAcidsRoutes/fattyAcidsRoutes.js";
import moistureRoutes from "./routes/moistureRoutes/moistureRoutes.js";
import proteinsRoutes from "./routes/proteinsRoutes/proteinsRoutes.js";
import sampleRoutes from "./routes/sampleRoutes/sampleRoutes.js";
import sodiumRoutes from "./routes/sodiumRoutes/sodiumRoutes.js";
import userRoutes from "./routes/userRoutes/userRoutes.js";
import excelRoutes from "./routes/excelRoutes/excelRoutes.js";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Usar swagger
swaggerDocs(app);

// Rutas de la API
app.use("/api", analysisRoutes);
app.use("/api", ashesRoutes);
app.use("/api", carbohydratesRoutes);
app.use("/api", clientRoutes);
app.use("/api", dietaryRoutes);
app.use("/api", energeticsRoutes);
app.use("/api", excelRoutes);
app.use("/api", fattyAcidsRoutes);
app.use("/api", moistureRoutes);
app.use("/api", proteinsRoutes);
app.use("/api", sampleRoutes);
app.use("/api", sodiumRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
