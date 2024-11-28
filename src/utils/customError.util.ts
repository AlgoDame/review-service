class ErrorObject extends Error {
  status: number;

  constructor(name: string, statusCode: number) {
    super();
    this.name = name;
    this.status = statusCode;
  }
}

export class UserError extends ErrorObject {
  constructor(message: string) {
    super('USER_ERROR', 400);
    this.message = message;
  }
}

export class NotFoundError extends ErrorObject {
  constructor(message: string) {
    super('NOT_FOUND_ERROR', 404);
    this.message = message;
  }
}

export class DuplicateResourceError extends ErrorObject {
  constructor(message: string) {
    super('DUPLICATE_RESOURCE_ERROR', 409);
    this.message = message;
  }
}

export class ValidationError extends ErrorObject {
  constructor(message: string) {
    super('VALIDATION_ERROR', 422);
    this.message = message;
  }
}

export class ServerError extends ErrorObject {
  constructor(message: string) {
    super('SERVER_ERROR', 500);
    this.message = message;
  }
}
