import { Router } from 'express';
import ProductsControler from '../controllers/products.controllers';

const router = Router();

const productsControler = new ProductsControler();

router.post('/products', productsControler.createProduct);

router.get('/products', productsControler.getProducts);

export default router;