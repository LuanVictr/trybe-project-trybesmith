import { Pool, ResultSetHeader } from 'mysql2/promise';
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
}

export default ProductsModel;