import Order from '../interfaces/order.interface';
import OrdersModel from '../models/order.model';

class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel();
  }

  public async getOrders():Promise<Order[]> {
    const orders = await this.model.getOrders();
    return orders;
  }
}
export default OrdersService;