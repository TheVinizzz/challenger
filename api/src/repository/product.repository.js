import { prisma } from "../services/prisma";

export const createProduct = async (data) => {
  const product = await prisma.product.create({
    data
  })

  return product
}

export const getAll = async () => {
  return await prisma.product.findMany()
}

export const getByID = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  return product
}

export const updateProduct = async (id, data) => {

  const product = await prisma.product.update({
    where: {
      id
    },
    data
  })
  return product
}

export const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id
    }
  })
  return product
}
