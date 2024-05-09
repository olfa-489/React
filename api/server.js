import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import orderRoute from './routes/order.route.js';
import gigRoute from './routes/gig.route.js';
import conversationRoute from './routes/conversation.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();
mongoose.set('strictQuery', true);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'something went wrong ';

  return res.status(errorStatus).send(errorMessage);
});
app.listen(5500, () => {
  connect();
  console.log('Backend server is running!');
});
