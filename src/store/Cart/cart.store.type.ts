import { IProduct } from "../Product/product.store.type";

export type ICartState = {
  listCart: IProduct[]
}

export type ICartActions = {
  setListCart: (product: IProduct) => void;
  setCartRemove: (productId: string) => void;
}

export type ICartStore = {
  state: ICartState
  actions: ICartActions
}
