import { z, ZodError } from 'zod'
import { VEHICLE_TYPES, VEHICLE_CATEGORIES, DAYS } from '../utils/constants'
import { Request, Response, NextFunction } from 'express'
import CustomError from '../utils/CustomError'
import { timeFormatRegex } from '../utils/common'

type DaysTuple = [string, ...string[]]
const daysArray = Object.keys(DAYS) as DaysTuple

const OrderRequestCreateSchema = z
  .object({
    startLocation: z.string(),
    endLocation: z.string(),
    count: z.number(),
    type: z.enum([VEHICLE_TYPES.SEDAN, VEHICLE_TYPES.SUV]),
    category: z.enum([VEHICLE_CATEGORIES.STANDARD, VEHICLE_CATEGORIES.STANDBY]),
    scheduleStart: z.string().pipe(z.coerce.date()),
    scheduleEnd: z.string().pipe(z.coerce.date()),
    timeStart: z.string().regex(timeFormatRegex, {
      message: 'timeStart param should be in HH:mm format',
    }),
    timeEnd: z.string().regex(timeFormatRegex, {
      message: 'timeEnd param should be in HH:mm format',
    }),
    dayStart: z.enum(daysArray),
    dayEnd: z.enum(daysArray),
  })
  .refine(
    // @ts-ignore
    (data) => {
      return DAYS[data.dayEnd] >= DAYS[data.dayStart]
    },
    //@ts-ignore
    (data) => {
      return {
        path: ['dayEnd'],
        message: `dayEnd param ${data.dayEnd} should come after dayStart param ${data.dayStart}`,
      }
    }
  )

export const createValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req
  const result = OrderRequestCreateSchema.safeParse(body)

  if (result.success) next()
  else {
    const formatted = result.error.format()
    // res.status(400).send({ error: formatted })
    throw new CustomError({
      statusCode: 403,
      type: 'VALIDATION_ERROR',
      code: 101,
      message: 'Validation Error',
      meta: {
        errors: formatted,
      },
    })
  }
}
