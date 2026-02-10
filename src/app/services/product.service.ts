import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MOCK_PRODUCTS, MOCK_PRODUCT_FUNNELS } from './mock/mock-product.data';
import { MOCK_CONVERSIONS } from './mock/mock-conversion.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts() { return of(MOCK_PRODUCTS); }
  getProductById(id: number) { return of(MOCK_PRODUCTS.find(p => p.id === id)); }
  createProduct(product: any) { return of({ ...product, id: Math.floor(100 + Math.random() * 900) }); }
  updateProduct(id: number, data: any) { return of({ id, ...data }); }
  deleteProduct(id: number) { return of(true); }
  getProductFunnels() { return of(MOCK_PRODUCT_FUNNELS); }
  getConversions() { return of(MOCK_CONVERSIONS); }
}
