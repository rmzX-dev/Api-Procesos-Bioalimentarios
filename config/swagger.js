import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerDocs;
