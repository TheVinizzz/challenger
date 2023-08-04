import { useQuery } from "@tanstack/react-query"
import { ProductApi } from "@/service/api/Product"

export const useProductQuery = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getProducts'],

    queryFn: async () => {
      return await ProductApi.listProducts()
    },
  })
  return { isLoading, data, error };
}


export const useGetOneProductQuery = (id: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getOneProduct'],
    queryFn: async () => {
      return await ProductApi.getOneProduct(id)
    },
  })
  return { isLoading, data, error };
}
