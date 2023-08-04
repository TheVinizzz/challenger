import { create } from 'zustand'
import { IProductStore } from './product.store.type'

export const useCollectionStore = create<IProductStore>((set) => ({
  state: {
    data: [],
  },
  actions: {
    clear: () => {
      set((state) => ({
        state: {
          ...state.state,
          data: [],
        }
      }))
    }
  }
}))
