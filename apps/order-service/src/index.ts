import Fastify from 'fastify';
import { Request, Response } from 'express';
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shouldBeUser } from './middleware/authMiddleware';

const fastify = Fastify()

fastify.register(clerkPlugin)

fastify.get("/", (request, reply) => {
    reply.send("Order endpoint is working")
})

fastify.get('/health', (request, reply) => {
  return reply.status(200).send({ 
    status: 'OK', 
    message: 'Payment endpoint is working',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

fastify.get("/test", {preHandler: shouldBeUser},(request, reply) => {
  const { isAuthenticated, userId } = getAuth(request)

  if(!userId) {
    return reply.send({message: "You are not logged in"})
  }

  return reply.send({message: "Order service is authenticated", userId: request.userId})
})


const start = async () => {
    try{
        await fastify.listen({ port: 8001 })
        console.log('Order service is running on port 8001')
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

start()