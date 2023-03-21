import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { defaultRoute } from './orderRequests/order-requests.routes'
import bodyParser from 'body-parser'
import { createErrorResponse } from './utils/common'
import CustomError from './utils/CustomError'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use('/order-requests', defaultRoute)

app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json(
        createErrorResponse(
          err?.meta.code ?? 500,
          err?.meta.type ?? 'Server Error',
          {
            message: err.message,
            meta: err.meta.errors,
          }
        )
      )
    } else {
      console.error(err)
      return res.status(500).json({ code: 500, error: 'Internal Server Error' })
    }
  }
)

export default app
