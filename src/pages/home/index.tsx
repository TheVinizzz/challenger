import CardProduct from '@/components/CardProduct';
import { useProductQuery } from '@/queries/Product/product.query';
import { Box, Grid } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'

export default function Home() {

  const { isLoading, data } = useProductQuery()

  if(isLoading) return (
    <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Spinner size='xl' />
    </Box>
  )

  return (
    <Box w="100%" p="20px">
      <Grid templateColumns='repeat(5, 1fr)' gap={6} templateRows="auto">
        {data?.map(val => (
          <CardProduct product={val} key={val.id}/>
        ))}
      </Grid>
    </Box>
  );
}
