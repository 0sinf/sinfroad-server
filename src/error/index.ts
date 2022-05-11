export class BadRequestException extends Error {
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedException extends Error {
  statusCode = 401;

  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenException extends Error {
  statusCode = 403;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends Error {
  statusCode = 404;

  constructor(message: string) {
    super(message);
  }
}
