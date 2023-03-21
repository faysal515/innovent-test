import { Request, Response } from 'express'
import CustomLogger from '../utils/logger'

export abstract class BaseController {
  protected readonly logger: CustomLogger

  constructor(className: string) {
    this.logger = new CustomLogger(className)
  }
}
