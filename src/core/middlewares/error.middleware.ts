import logger from "@config/logger";
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  NotFoundError,
} from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        statusCode: 404,
        message: "Resource not found",
      });
    } else {
      // Handle other errors (500 Internal Server Error)
      logger.error(`Error ====> ${error.errors}`);
      response.status(error.httpCode || 500).json({
        statusCode: error.httpCode || 500,
        message: error.message || "Internal server error",
        errors: error.errors || undefined,
      });
    }
  }
}
