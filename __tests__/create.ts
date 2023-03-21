import request from 'supertest'
import app from '../src/index'

beforeAll(async () => {
  console.log('✨ Database URL: ', process.env.DATABASE_URL)
})

describe('POST /', () => {
  test('should return 200 OK with the request body', async () => {
    const requestBody = {
      count: 10,
      type: 'SEDAN',
      startLocation: 'Abu dhabi',
      endLocation: 'Dubai',
      category: 'STANDARD',
      scheduleStart: '2023-01-01T00:00:00.000Z',
      scheduleEnd: '2023-01-31T00:00:00.000Z',
      timeStart: '09:00',
      timeEnd: '22:30',
      dayStart: 'TUESDAY',
      dayEnd: 'FRIDAY',
    }

    const response = await request(app)
      .post('/order-requests')
      .send(requestBody)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(201)
  })
})
