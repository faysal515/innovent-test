interface SuccessResponse<T> {
  code: number
  result: T
}

interface ErrorResponse {
  code: number
  error: {
    type: string
    error: any
    rest: any[]
  }
}

export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    code: 200,
    result: data,
  }
}

export function createErrorResponse(
  code: number,
  type: string,
  err: any,
  ...rest: any[]
): ErrorResponse {
  return {
    code,
    error: { type, error: err, rest },
  }
}

export const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
