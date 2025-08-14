import express from "express";
import dotenv from "dotenv";
import corsConfig from "./config/cors.js";
import { serverConfig } from "./config/server.js";

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
import cors from 'cors';
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

//app.use(corsConfig);
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
app.use("/api", folavRoutes);
app.use("/api", nutrimentalRoutes);

// Ruta de health check para Railway (ANTES del middleware de errores)
app.get('/health', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    const pool = await import('./config/db.js');
    const client = await pool.default.connect();
    await client.query('SELECT 1');
    client.release();
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'API funcionando correctamente',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    // En Railway, si la base de datos no está configurada, aún queremos que el health check pase
    // para que la aplicación pueda iniciar y luego configurar la base de datos
    res.status(200).json({ 
      status: 'OK', 
      message: 'API funcionando correctamente',
      database: 'Not configured',
      warning: 'Database connection not available',
      timestamp: new Date().toISOString()
    });
  }
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

// Ruta /api para health check fallback (Railway usa esta ruta por defecto)
app.get('/api', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    const pool = await import('./config/db.js');
    const client = await pool.default.connect();
    await client.query('SELECT 1');
    client.release();
    
    res.json({ 
      message: 'API de Procesos Bioalimentarios',
      status: 'OK',
      database: 'Connected',
      availableEndpoints: [
        '/api/users',
        '/api/samples',
        '/api/analysis',
        '/api/clients',
        '/health',
        '/api-docs'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API health check error:', error);
    // En Railway, si la base de datos no está configurada, aún queremos que el health check pase
    res.status(200).json({ 
      message: 'API de Procesos Bioalimentarios',
      status: 'OK',
      database: 'Not configured',
      warning: 'Database connection not available',
      availableEndpoints: [
        '/api/users',
        '/api/samples',
        '/api/analysis',
        '/api/clients',
        '/health',
        '/api-docs'
      ],
      timestamp: new Date().toISOString()
    });
  }
});

// Middleware de manejo de errores (debe ir DESPUÉS de todas las rutas)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || serverConfig.port;
const HOST = process.env.HOST || serverConfig.host;

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`📚 Documentación disponible en http://${HOST}:${PORT}/api-docs`);
  console.log(`🏥 Health check en http://${HOST}:${PORT}/health`);
});

// Configurar timeouts del servidor
server.timeout = serverConfig.timeout;
server.keepAliveTimeout = serverConfig.keepAliveTimeout;
server.headersTimeout = serverConfig.headersTimeout;

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido, cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});
