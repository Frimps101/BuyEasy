import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true
}))

app.get("/", (req:Request, res:Response) => {
  res.json({
    message: "Product endpoint is working"
  })
})

app.get('/health', (req:Request, res:Response) => {
  return res.status(200).json({ 
    status: 'OK', 
    message: 'Product endpoint is working',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.listen(8000, () => {
  console.log('Product service is running on port 8000');
});