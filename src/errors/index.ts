
export class ConfigurationError extends Error {}

// Base API Error
export class CcrApiError extends Error {
  private _code: string = 'OPERATION_FAILED';
  private _statusCode: number = 400;

  constructor(msg: string, code?: string, statusCode?: number) {
    super(msg);
    if (code) this._code = code;
    if (statusCode) this._statusCode = statusCode;
  }

  public get code() {
    return this._code;
  }

  public get statusCode() {
    return this._statusCode;
  }
}

export class CcrValidationError extends CcrApiError {
  constructor(msg: string) {
    super(msg, 'VALIDATION_FAILED', 400);
  }
}

export class CcrUnauthorizedError extends CcrApiError {
  constructor(msg: string) {
    super(msg, 'UNAUTHORIZED', 401);
  }
}