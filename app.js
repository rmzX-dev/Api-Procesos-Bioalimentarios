import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import sampleRoutes from "./routes/sampleRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import swaggerDocs from "./config/swagger.js";
import excelRoutes from "./routes/excelRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Usar swagger
swaggerDocs(app);

// Rutas de la API
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", sampleRoutes);
app.use("/api", analysisRoutes);
app.use("/api", excelRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
