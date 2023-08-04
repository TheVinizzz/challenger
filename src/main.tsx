import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient, theme } from '@/utils/index';
import AppRoutes from './routes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "@fontsource/poppins";
import "./main.css"

const stripePromise = loadStripe("pk_test_51NazlFItNQxscDgfwrvgEcETYDSQczH1rGlrlT0NZRfxkckAsFONYqwmOkTL9OxQCtxeDYkZwrJc84a9fpHLBq51006hcHmm10")

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <AppRoutes />
        </Elements>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
