import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the ThalassemiaCare backend!');
});

app.use('/api/auth', authRoutes);

connectDB().then(()=>{
  console.log('MongoDB connected successfully.');
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  })
}).catch((error)=>{
  console.error('MongoDB connection error:', error);
  process.exit(1);
})