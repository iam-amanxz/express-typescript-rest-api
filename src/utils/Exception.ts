export class Exception extends Error {
  constructor(
    public message: string,
    public code?: number,
    public errors?: any,
  ) {
    super();
    this.stack = (<any>new Error()).stack;
    this.name = 'Exception';
    this.message = message;
    this.code = code;
    this.errors = errors;
  }

  toString() {
    return {
      status: this.code ? this.code : 500,
      message: `${this.name}: ${this.message}`,
      errors: this.errors ? this.errors : [],
    };
  }
}
