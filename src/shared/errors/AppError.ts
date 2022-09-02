import { ValidationError } from "class-validator";
export class AppError {
  public readonly message: string | Object;

  public readonly statusCode: number;

  constructor(message: string | Object, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
