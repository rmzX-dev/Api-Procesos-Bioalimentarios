import express from "express";
import dotenv from "dotenv";
import corsConfig from "./config/cors.js";

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
import folavRoutes from "./routes/folavRoutes/folavRoutes.js";
import nutrimentalRoutes from './routes/nutrimentalRoutes/nutrimentalRoutes.js';
import swaggerDocs from "./config/swagger.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(corsConfig);
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
app.use("/api", folavRoutes);
app.use("/api", nutrimentalRoutes);

// Middleware de manejo de errores (debe ir después de todas las rutas)
app.use(notFoundHandler);
app.use(errorHandler);

// Ruta de health check para Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Procesos Bioalimentarios',
    version: '1.0.0',
    endpoints: '/api',
    docs: '/api-docs'
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`📚 Documentación disponible en http://${HOST}:${PORT}/api-docs`);
  console.log(`🏥 Health check en http://${HOST}:${PORT}/health`);
});
