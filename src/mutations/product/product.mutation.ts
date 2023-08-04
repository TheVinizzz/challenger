import { api } from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutateProduct = () => {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: async (form: any) => {
      const formData = new FormData();
      formData.append('photo', form.photo[0])
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      const response = await api.post(`/create`, formData, config);

      if (response.status !== 200) {
        return Promise.reject(await response.data);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    }
  });

  const updateProduct = useMutation({
    mutationFn: async ({id, form}: any) => {
      const formData = new FormData();
      if(form.photo[0]) {
        formData.append('photo', form.photo[0])
      }
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      const response = await api.put(`product/${id}`, formData, config);

      if (response.status !== 200) {
        return Promise.reject(await response.data);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    }
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/product/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getProducts"]);
    }
  });

  const paymentProducts = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`/payment`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getProducts"]);
    }
  });

  return {
    createProduct,
    deleteProduct,
    updateProduct,
    paymentProducts
  }
}

export default useMutateProduct
