import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import Product from '../interfaces/product.interface';

class ProductsModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async createProduct(product: Product):Promise<number> {
    const query = `
    INSERT INTO Trybesmith.products(name,amount) 
    VALUES (?,?)`;
    const [{ insertId }] = await 
    this.connection.execute<ResultSetHeader>(query, [product.name, product.amount]);
    return insertId;
  }

  public async getProducts():Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.products';
    const [result] = await this.connection.execute<Product[] & RowDataPacket[]>(query);
    return result;
  }
}

export default ProductsModel;