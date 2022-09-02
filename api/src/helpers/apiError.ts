export default class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super()
  }
}

export class NotFoundError extends ApiError {
  constructor(
    readonly message: string = 'Not Found',
    readonly statusCode: number = 404,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    readonly message: string = 'Forbidden',
    readonly statusCode: number = 403,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class InternalServerError extends ApiError {
  constructor(
    readonly message: string = 'Internal Server Error',
    readonly statusCode: number = 500,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    readonly message: string = 'Unauthorized Request',
    readonly statusCode: number = 401,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class BadRequestError extends ApiError {
  constructor(
    readonly message: string = 'Bad Request',
    readonly statusCode: number = 400,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class TransactionError extends ApiError {
  constructor(
    readonly message: string = 'Transaction error',
    readonly statusCode: number = 500,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class MongoServerError extends ApiError {
  constructor(
    readonly message: string = 'Mongo Sever Error',
    readonly statusCode: number = 400,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class DuplicateError extends ApiError {
  constructor(
    readonly message: string = 'Duplicate values',
    readonly statusCode: number = 406,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class ValidationError extends ApiError {
  constructor(
    readonly message: string = 'Duplicate values',
    readonly statusCode: number = 406,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}

export class InvalidToken extends ApiError {
  constructor(
    readonly message: string = 'Invalid token',
    readonly statusCode: number = 401,
    source?: Error | any
  ) {
    super(statusCode, message, source)
  }
}
