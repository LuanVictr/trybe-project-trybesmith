import { Request, Response } from 'express';
import Product from '../interfaces/product.interface';
import ProductsService from '../services/products.services';

class ProductsControler {
  constructor(private productService = new ProductsService()) {}

  public createProduct = async (req: Request, res: Response) => {
    try {
      const productInfo = req.body;
      const product:Product = await this.productService.createProduct(productInfo);
      res.status(201).send(product);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

export default ProductsControler;