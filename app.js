import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Usar swagger
swaggerDocs(app);

// Rutas de la API
app.use("/api", userRoutes);
app.use("/api", clientRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
