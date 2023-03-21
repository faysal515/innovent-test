import { createSuccessResponse } from '../utils/common'
import CustomLogger from '../utils/logger'
import OrderRequestrepository from './order-requests.repository'

export default class OrderRequestController {
  private repository: OrderRequestrepository
  private logger: CustomLogger
  constructor() {
    this.repository = new OrderRequestrepository()
    this.logger = new CustomLogger(OrderRequestController.name)
  }

  async create(user: any, body: any) {
    this.logger.info('Creating order request', body)
    const data = await this.repository.save(body)
    return createSuccessResponse(data)
  }

  async getAllRequests() {
    this.logger.info('Getting all order requests')
    const data = await this.repository.getAll()
    return createSuccessResponse(data)
  }
}
