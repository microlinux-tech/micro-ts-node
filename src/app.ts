import express, { Application } from "express";
import mongoose from "mongoose";
import { useExpressServer } from "routing-controllers";
import "reflect-metadata";
import environments from "@config/env";
import logger from "@config/logger";
import { ResponseInterceptor } from "@core/interceptors/response.interceptor";
import { ErrorMiddleware } from "@core/middlewares/error.middleware";

class App {
  public express: Application;
  public port: number;
  public routePrefix: string;

  constructor(controllers: any[], port: number, routePrefix?: string) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers, routePrefix && routePrefix);
  }

  private initializeDatabaseConnection(): void {
    const { name } = environments,
      { username, password, path } = environments.dataStore;

    mongoose
      .connect(`mongodb+srv://${username}:${password}@${path}`)
      .then(() => {
        logger.info(`Connection is ready!, This is ${name}`);
      })
      .catch((err) => logger.error(err.message));

    mongoose.connection.on("disconnected", () => {
      logger.info(`Mongoose connection is disconnected.`);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  private initializeMiddleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(
    controllerList: any[],
    routePrefix: string
  ): void {
    useExpressServer(this.express, {
      controllers: controllerList,
      routePrefix: routePrefix ? `/api${routePrefix}` : "/api",
      defaultErrorHandler: false,
      middlewares: [ErrorMiddleware], // Check import and implementation of ErrorMiddleware
      interceptors: [ResponseInterceptor], // Check import and implementation of ResponseInterceptor
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      logger.info(`App listening on port ${this.port}`);
    });
  }
}

export default App;
