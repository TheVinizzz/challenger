import useFilePreview from "@/hooks/useFilePreview"
import useMutateProduct from "@/mutations/product/product.mutation"
import { useGetOneProductQuery } from "@/queries/Product/product.query"
import { urlApplication } from "@/service/api"
import { Box, Card, CardBody, Image, Input, FormControl, FormLabel, FormErrorMessage, Button, Text, useToast, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

const FormProduct = () => {

  const { id } = useParams();

  const { isLoading, data } = useGetOneProductQuery(String(id))
  const { createProduct, updateProduct } = useMutateProduct()

  const navigate = useNavigate()

  const toast = useToast()

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  }: any = useForm({
    defaultValues: data
  })
  console.log("🚀 ~ file: index.tsx:26 ~ FormProduct ~ getValues:", getValues())
  const onSubmit = async (values: any) => {
    try {
      if (!id) {
        await createProduct.mutateAsync(values)
        toast({
          title: `Produto enviado com sucesso`,
          status: "success",
          isClosable: true,
        })
        return navigate('/')
      }
      await updateProduct.mutateAsync({ form: values, id })
      toast({
        title: `Produto alterado com sucesso`,
        status: "success",
        isClosable: true,
      })
    }
    catch (e) {
      toast({
        title: `Houve um erro ao tentar enviar seu produto, verifique seus dados ou sua internet`,
        status: "error",
        isClosable: true,
      })
    }
  }

  const photo = watch("photo");
  const [filePreview]: any = useFilePreview(photo);

  const handleRenderImage = (): string => {
    if (id && !filePreview) {
      return `${urlApplication}/${data?.url}`
    }
    return Boolean(filePreview) ? filePreview : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081'
  }

  const requestImageEdit = () => {
    return !id ?? {
      required: 'Foto é obrigatória'
    }
  }

  useEffect(() => {
    if (!!data && id) {
      setValue('name', data.name, { shouldDirty: true })
      setValue('description', data.description, { shouldDirty: true })
      setValue('price', data.price, { shouldDirty: true })
    }

    return () => reset({
      name: '',
      description: '',
      price: ''
    })
  }, [data])

  if (isLoading) return (
    <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Spinner size='xl' />
    </Box>
  )

  return (
    <Box w="100%" display="flex" justifyContent="center" py="10px">
      <Card w="60%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody display="flex" flexDirection="column" alignItems="center" gap="5">
            <Box
              position="relative"
              _hover={{ opacity: "0.5" }}
            >
              <Image
                borderRadius='full'
                boxSize='150px'
                src={handleRenderImage()}
                alt='Dan Abramov'
                border={`solid 1px ${Object.keys(errors).includes("photo") ? "red" : "#00A786"}`}
              />
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                cursor="pointer"
                id='photo'
                name="photo"
                {...register('photo', requestImageEdit())}
              />
              <Text color="red" mt="10px" textAlign="center">
                {errors?.photo?.message}
              </Text>
            </Box>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor='name'>Nome do produto</FormLabel>
              <Input
                id='name'
                name="name"
                placeholder='Nome do produto'
                {...register('name', {
                  required: 'Nome é obrigatório',
                  minLength: { value: 4, message: 'Deve ter no minimo 4 caracteres' },
                })}
              />
              <FormErrorMessage>
                {errors?.name?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor='description'>Descrição do produto</FormLabel>
              <Input
                id='description'
                placeholder='Descrição do produto'
                {...register('description', {
                  required: 'Descrição do produto é obrigatório',
                  minLength: { value: 4, message: 'Deve ter no minimo 4 caracteres' },
                })}
              />
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.price)}>
              <FormLabel htmlFor='price'>Preço do produto</FormLabel>
              <Input
                id='price'
                placeholder='Preço do produto'
                type="number"
                {...register('price', {
                  required: 'Preço do produto é obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors?.price?.message}
              </FormErrorMessage>
            </FormControl>
            <Box display="flex" gap="3">
              <Button mt={4} colorScheme='red' onClick={() => navigate("/")}>
                Voltar
              </Button>
              <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Enviar
              </Button>
            </Box>
          </CardBody>
        </form>
      </Card>
    </Box>
  )
}

export default FormProduct
