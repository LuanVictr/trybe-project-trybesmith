import express from 'express';
import productsRouter from './routes/products.routes';
import userRouter from './routes/user.routes';

const app = express();

app.use(express.json());

app.use(productsRouter);

app.use(userRouter);

export default app;
