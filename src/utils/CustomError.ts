interface CustomErrorMeta {
  statusCode?: number
  type?: string
  code?: number
  message?: string
  [key: string]: any
}

class CustomError extends Error {
  statusCode: number
  meta: CustomErrorMeta

  constructor({
    message = '',
    statusCode = 403,
    code,
    type,
    meta = {},
  }: {
    message?: string
    statusCode?: number
    code?: number
    type?: string
    meta?: CustomErrorMeta
  }) {
    super(message)
    this.meta = meta
    this.meta.statusCode = statusCode
    if (code) {
      this.meta.code = code
    }
    if (type) {
      this.meta.type = type
    }
    this.statusCode = statusCode
  }

  toString(): string {
    return `${super.toString()} ${JSON.stringify(this.meta)}`
  }

  getErrorObject(): { code: number; message: string } {
    return {
      code: this.meta.code || this.statusCode,
      message: this.meta.message || this.message,
    }
  }
}

export default CustomError
