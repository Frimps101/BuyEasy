import Fastify from 'fastify';
import { Request, Response } from 'express';

const fastify = Fastify()

fastify.get("/", (request, reply) => {
    reply.send("Order endpoint is working")
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