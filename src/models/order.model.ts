import { Pool, RowDataPacket } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
import connection from './connection';

class OrdersModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getOrders():Promise<Order[]> {
    const query = `SELECT o.id , o.user_id AS userId, JSON_ARRAYAGG(p.id) AS productsIds
    FROM Trybesmith.orders AS o
    JOIN Trybesmith.products AS p
    ON o.id = p.order_id
    GROUP BY o.id;`;
    const [result] = await this.connection.execute<RowDataPacket[] & Order[]>(query);
    return result;
  }
}

export default OrdersModel;