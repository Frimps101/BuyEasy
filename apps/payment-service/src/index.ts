import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

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