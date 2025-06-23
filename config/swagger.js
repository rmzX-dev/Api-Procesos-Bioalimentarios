import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INTEGRATIVE PROJECT API.",
      version: "1.0.0",
      description: "Api Procesos BioAlimentarios",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Aquí van las rutas donde están los comentarios Swagger
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs disponibles en http://localhost:${process.env.PORT || 3000}/api-docs`);
};

export default swaggerDocs;
