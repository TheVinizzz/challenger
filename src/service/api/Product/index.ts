import { IProduct } from '@/store/Product/product.store.type';
import { api } from '..'

export class ProductApi {
  private static readonly baseUrl = '/product'

  static async listProducts(): Promise<IProduct[]> {
    const url = `${ProductApi.baseUrl}`
    const response = await api.get(url);
    return response.data;
  }

  static async getOneProduct(id: string): Promise<IProduct> {
    const url = `${ProductApi.baseUrl}/${id}`
    const response = await api.get(url);
    return response.data;
  }
}

