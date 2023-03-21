import { PrismaClient } from '@prisma/client'
import app from './index'

const prisma = new PrismaClient()

const port = process.env.PORT || 3000

const server = async () => {
  try {
    await prisma.$connect()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (e) {
    console.error('FATAL: ', e)
    process.exit(1)
  }
}

server()
