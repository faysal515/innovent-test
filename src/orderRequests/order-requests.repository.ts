// import { OrderRequest, PrismaClient } from '@prisma/client'
import { OrderRequest, PrismaClient, Prisma } from '@prisma/client'

export default class OrderRequestrepository {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }

  save(body: any): Promise<OrderRequest> {
    return this.prisma.orderRequest.create({ data: body })
  }

  getAll(): Promise<OrderRequest[]> {
    return this.prisma.orderRequest.findMany()
  }
}
