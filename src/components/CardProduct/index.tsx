import { FC, useState } from "react"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { ICardProduct } from "./types";
import { DeleteIcon } from "@chakra-ui/icons";
import useCartStore from "@/store/Cart/cart.store";
import { urlApplication } from "@/service/api";
import useMutateProduct from "@/mutations/product/product.mutation";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardProduct: FC<ICardProduct> = ({product, key}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setListCart } = useCartStore()
  const { deleteProduct } = useMutateProduct()

  const navigate = useNavigate()

  const toast = useToast()

  const handleAddCart = () => {
    setListCart(product)
    toast({
      title: `Produto ${product.name} adicionado ao carrinho`,
      status: "success",
      isClosable: true,
    })
  }

  const handleDeleteProduct = async () => {
    await deleteProduct.mutateAsync(product.id)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Card maxW='sm' key={key}>
      <CardBody>
        <Image
          src={`${urlApplication}/${product.url}`}
          alt={`Photo Product ${product.name}`}
          borderRadius='lg'
          w="100%"
          h="300px"
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{product.name}</Heading>
          <Text>
            {product.description}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            R${product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button
            variant='solid'
            bg='maisTodos.100'
            color="#ffff"
            _hover={{bg: 'maisTodos.200'}}
            onClick={handleAddCart}
          >
            Adicionar ao carrinho
          </Button>
          <Button
            variant='solid'
            colorScheme='red'
            onClick={() => setIsOpen(true)}
          >
            <DeleteIcon />
          </Button>
          <Button
            variant='solid'
            colorScheme='blue'
            onClick={() => navigate(`/product/${product.id}/edit`)}
          >
            <Pencil />
          </Button>
        </ButtonGroup>
      </CardFooter>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir produto {product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Tem certeza que quer excluir o produto <b>{product.name}?</b>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
            <Button colorScheme='red' onClick={handleDeleteProduct} isLoading={deleteProduct.isLoading}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default CardProduct
