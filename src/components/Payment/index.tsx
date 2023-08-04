import { FC, useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import useMutateProduct from '@/mutations/product/product.mutation';
import useCartStore from '@/store/Cart/cart.store';

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#000',
      },
    },
    invalid: {
      iconColor: '#eb1717',
      color: '#eb1717',
    },
  },
}

const Payment: FC<any> = ({value}) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const stripe: any = useStripe()
  const elements: any = useElements()

  const {paymentProducts} = useMutateProduct()
  const { setClearCart } = useCartStore()

  const toast = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
    })

    if (!error) {
      try {
        setLoading(true)
        const { id } = paymentMethod

        await paymentProducts.mutateAsync({
          amount: Number(value),
          id
        })
        setSuccess(true)
        setClearCart()
      }
      catch (error) {
        toast({
          title: `Verifique os dados do seu cartão`,
          status: "error",
          isClosable: true,
        })
      }
      finally {
        setLoading(false)
      }
    } else {
      console.log(error.message)
    }
  }

  return (

    <>
      {!success ?
        <form onSubmit={handleSubmit}>
          <Text fontWeight="bold" my="5px">Numero do cartão</Text>
          <fieldset className='FormGroup'>
            <div className="FormRow">
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Text fontWeight="bold" my="5px">Validade do cartão</Text>
          <fieldset className='FormGroup'>
            <div className="FormRow">
              <CardExpiryElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Text fontWeight="bold" my="5px">Código Segurança (CVV)</Text>
          <fieldset className='FormGroup'>
            <div className="FormRow">
              <CardCvcElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Box display="flex" justifyContent="center" px="12px">
            <Button
              type='submit'
              w="100%"
              colorScheme='blue'
              isLoading={loading}
            >
              Pagar
            </Button>
          </Box>
        </form>
        :
        <div className="payment-success">
          <h2>Pagamento Realizado com sucesso</h2>
          <h3 className='Thank-you'>Obrigado por seu apoio</h3>
        </div>
      }
    </>

  );
};

export default Payment;
