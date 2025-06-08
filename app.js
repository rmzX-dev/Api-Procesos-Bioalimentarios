const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
