import { Router } from 'express';
import ProductsControler from '../controllers/products.controllers';

const router = Router();

const productsControler = new ProductsControler();

router.post('/products', productsControler.createProduct);

export default router;