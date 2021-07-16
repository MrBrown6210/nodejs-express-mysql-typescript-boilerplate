import express, { Application } from "express";
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";

import routes from "./routes";

import Router from "./routes";
import dbConfig from "./config/database";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

app.use(routes)

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });