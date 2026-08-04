import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { shouldBeUser } from '../middleware/authMiddleware.js'


const app = new Hono()

app.use('*', clerkMiddleware())

app.get('/', (c) => {
  return c.text('Payment endpoint is working')
})

app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    message: 'Payment endpoint is working',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.get("/test", shouldBeUser, (c) => {
  return c.json({
    message: "Payment service is authenticated.",
    userId: c.get("userId")
  })
})

const start = async () => {
  try{
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment Server is running on http://localhost:${info.port}`)
    })
  }catch(error){
    console.error(error)
    process.exit(1)
  }
}

start()