import { Request, Response, Router } from 'express'
import OrderRequestController from './order-requests.controller'
import { createValidator } from './validation'

export const defaultRoute = Router()

const controller = new OrderRequestController()

defaultRoute.post('/', createValidator, async (req: Request, res: Response) => {
  const { body } = req
  const result = await controller.create(undefined, body)
  return res.status(201).send(result)
})

defaultRoute.get('/', async (req: Request, res: Response) => {
  const result = await controller.getAllRequests()
  return res.status(200).send(result)
})
