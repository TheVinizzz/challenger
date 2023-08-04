export type IProduct = {
  id: string;
  name: string;
  description: string;
  url: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export type IProductState = {
  data: IProduct[]
}

export type IProductActions = {
  clear: () => void;
}

export type IProductStore = {
  state: IProductState
  actions: IProductActions
}
