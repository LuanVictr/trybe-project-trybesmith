import express from 'express';
import productsRouter from './routes/products.routes';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use(productsRouter);

app.use(userRouter);

app.use(orderRouter);

app.use(loginRouter);

export default app;
