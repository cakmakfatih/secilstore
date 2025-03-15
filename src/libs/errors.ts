export interface InvalidCredentialsResponse extends Error {
  status: number;
  message: string;
  request: string;
  method: string;
}

export interface InvalidFieldsResponse extends Error {
  status: number;
  message: string;
  data: {
    errors: {
      Username?: string[];
      Password?: string[];
    };
  };
}

export class InvalidCredentialsError extends Error implements InvalidCredentialsResponse {
  status: number;
  message: string;
  request: string;
  method: string;

  constructor({
    status,
    message,
    request,
    method,
  }: {
    status: number;
    message: string;
    request: string;
    method: string;
  }) {
    super(message);

    this.status = status;
    this.message = message;
    this.request = request;
    this.method = method;
  }
}

export class InvalidFieldsError extends Error implements InvalidFieldsResponse {
  status: number;
  message: string;
  data: {
    errors: {
      Username?: string[];
      Password?: string[];
    };
  };

  constructor({ status, message, data }: InvalidFieldsResponse) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
