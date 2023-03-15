import { Request, Response } from 'express';
import OrdersService from '../services/order.services';

class OrderController {
  constructor(private orderService = new OrdersService()) {}

  public getOrders = async (_req: Request, res:Response) => {
    const orders = await this.orderService.getOrders();
    res.status(200).send(orders);
  };
}

export default OrderController;