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
      name: Joi.string().required(),
      amount: Joi.string().required(),
    });
    return productSchemma.validate(product);
  }

  public async createProduct(product: Product):Promise<Product> {
    const { error } = ProductsService.validateProduct(product);
    if (error) {
      throw Object.assign(
        new Error(error.message),
        { status: 500 },
      );
    }
    const createdProductId = await this.model.createProduct(product);
    return {
      id: createdProductId,
      name: product.name,
      amount: product.amount,
    };
  }
}

export default ProductsService;