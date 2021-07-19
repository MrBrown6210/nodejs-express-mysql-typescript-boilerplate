import { Request, Response, NextFunction } from "express"

class ApiError extends Error {
    statusCode: number
    isOperational: boolean
    constructor(statusCode: number, message: string, isOperational = true, stack = '') {
      super(message)
      this.statusCode = statusCode
      this.isOperational = isOperational
      if (stack) {
        this.stack = stack
      } else {
        Error.captureStackTrace(this, this.constructor)
      }
    }
}
  
export default ApiError

// Error handler middleware for async controller
export const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
  return Promise
      .resolve(fn(req, res, next))
      .catch(next);
};