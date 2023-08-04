import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { IProduct } from '../Product/product.store.type';
import { ICartState } from './cart.store.type';

const useCartStore = create<any>(persist((set) => ({
  listCart: [],

  setListCart: (product: IProduct) => set((state: ICartState) => {
    const listCart = [...state.listCart, product]
    return { listCart }
  }),
  setCartRemove: (productId: string) => set((state: ICartState) => {
    const listCart = state.listCart.filter((val: IProduct) => val.id !== productId)
    return { listCart }
  }),
  setClearCart: () => set(() => ({ listCart: [] })),
}), {
  name: 'cart-store',
  storage: createJSONStorage(() => sessionStorage),
}));

export default useCartStore;
