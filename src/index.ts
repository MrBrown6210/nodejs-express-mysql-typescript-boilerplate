import express, { Application } from "express";
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";

import { errorConverter, errorHandler } from './middlewares/error'

import routes from "./routes";
import dbConfig from "./config/database";
import { createConnection } from "typeorm";
import { APP_PORT, APP_PREFIX_PATH } from "./config/env";

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

app.use(APP_PREFIX_PATH, routes)

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(APP_PORT, () => {
      console.log("Server is running on port", APP_PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });