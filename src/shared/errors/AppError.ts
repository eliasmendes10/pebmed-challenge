import { ValidationError } from "class-validator";
export class AppError {
  public readonly message: string | ValidationError[];

  public readonly statusCode: number;

  constructor(message: string | ValidationError[], statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
