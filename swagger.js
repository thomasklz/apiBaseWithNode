// In src/v1/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic Meta Informations about our API
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Api practice of class",
        version: "1.0.0",
        description:
          "This is a basic API for practicing the use of classes in NodeJS.",
      },
      servers: [
        {
          url: "http://localhost:3000/", // Added a trailing slash
          description: "Servidor local",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Adjust based on your token implementation
          },
        },
      },
    },
    apis: [`${path.join(__dirname, "./router/*.js")}`],
    security: [
      {
        bearerAuth: [], // Reference to the security scheme
      },
    ],
  };
  

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
export const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/docs`
  );
};
