import Joi from 'joi';
import Product from '../interfaces/product.interface';
import ProductsModel from '../models/products.model';

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel();
  }

  static validateProduct(product: Product) {
    const productSchemma = Joi.object({
      id: Joi.number(),
      name: Joi.string().min(3).required(),
      amount: Joi.string().min(3).required(),
    });
    return productSchemma.validate(product);
  }

  public async createProduct(product: Product):Promise<Product> {
    const { error } = ProductsService.validateProduct(product);
    console.log(error);
    if (error) {
      throw Object.assign(
        new Error(error.message),
        error.details[0].type === 'string.base' 
        || error.details[0].type === 'string.min' ? { status: 422 } : { status: 400 }
        ,
      );
    }
    const createdProductId = await this.model.createProduct(product);
    return {
      id: createdProductId,
      name: product.name,
      amount: product.amount,
    };
  }

  public async getProducts():Promise<Product[]> {
    const products = await this.model.getProducts();
    return products;
  }
}

export default ProductsService;