import Payment from "@/components/Payment";
import { urlApplication } from "@/service/api";
import useCartStore from "@/store/Cart/cart.store";
import { IProduct } from "@/store/Product/product.store.type";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Heading, Menu, MenuButton, MenuItem, MenuList, Image, Button, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LoggedLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { listCart, setClearCart } = useCartStore()

  const navigate = useNavigate()

  const toast = useToast()

  const handleClearCart = () => {
    setClearCart()
    toast({
      title: `Seu carrinho foi limpo com sucesso`,
      status: "error",
      isClosable: true,
    })
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const totalValueCart = listCart?.reduce((acc: number, val: IProduct) => acc + Number(val.price), 0)
  const maskTotal = totalValueCart.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

  return (
    <Box height="100vh">
      <Box px="4" h="50px" width="100%" display="flex" justifyContent="space-between" bg="maisTodos.100" alignItems="center">
        <Heading as="h1" size="xl">
          MaisTodos
        </Heading>
        <Box>
          <Button
            leftIcon={<PlusCircle />}
            mr="5px"
            size="sm"
            variant='solid'
            bg='#1A202C'
            color="#ffff"
            _hover={{ bg: '#3a4761' }}
            onClick={() => navigate("/product/create")}
          >
            Adicionar produto
          </Button>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              leftIcon={<ShoppingCart />}
              rightIcon={<ChevronDownIcon />}
              size="sm"
              variant='solid'
              bg='#1A202C'
              color="#ffff"
              _hover={{ bg: '#3a4761' }}
              _active={{ bg: '#3a4761' }}
            >
              Carrinho
            </MenuButton>
            <MenuList>
              {listCart.length === 0 ? (
                <MenuItem minH='48px' disabled>
                  <Text>Adicione algum produto a seu carrinho</Text>
                </MenuItem>
              ) : (
                <>
                  {listCart?.map((val: IProduct) => (
                    <MenuItem minH='48px' key={`cart-${val.id}`} display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <Image
                          boxSize='2rem'
                          borderRadius='full'
                          src={`${urlApplication}/${val.url}`}
                          alt='Fluffybuns the destroyer'
                          mr='12px'
                        />
                        <span>{val.name}</span>
                      </Box>
                      <Text
                        ml="10px"
                        fontWeight="bold"
                        fontSize="14px"
                      >
                        {Number(val.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                      </Text>
                    </MenuItem>
                  ))}
                  <MenuItem display="flex" flexDirection="column" alignItems="center" gap="2" _hover={{ bg: 'none' }}>
                    <Text fontWeight="bold" fontSize="14px">Total { maskTotal }</Text>
                    <Button
                      variant='solid'
                      bg='maisTodos.100'
                      color="#ffff"
                      _hover={{ bg: 'maisTodos.200' }}
                      onClick={() => setIsOpen(true)}
                    >
                      Finalizar Compra
                    </Button>
                    <Button
                      size='xs'
                      variant='ghost'
                      colorScheme='red'
                      onClick={handleClearCart}
                    >
                      Limpar Carrinho
                    </Button>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box bg="brand.100" minH="100%">
        <Outlet />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Realizar Pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {listCart.length > 0 && `Suas compras deram um total de ${maskTotal ?? maskTotal}`}
            <Box my="20px">
              <Payment value={totalValueCart}/>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
            <Button colorScheme='red' onClick={onClose}>
              Voltar as compras
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
