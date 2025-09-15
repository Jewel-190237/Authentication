import { HttpStatusCode } from 'axios';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

export class ProductService {
    static async createProduct(payload: Partial<TProduct>) {
        const product = await Product.create(payload)
        if(!product){
            throw new AppError(
                HttpStatusCode.NotFound,
                'Request Failed !',
                'Failed to create blog ! Please check all the fields and try again'
            )
        }
        return product
    }
}
