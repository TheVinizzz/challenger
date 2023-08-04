import { PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';





const Payment = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51NazlFItNQxscDgf0aSd1aY7d0EFn4uY19oGDxfH2pN1r7MBIAVJ1SQ9ZaUIr4l6GUFcJz63Cjxo9hbuir2H1VWY000bU3oYXO',
  };

  let stripePromise: any;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe("pk_test_51NazlFItNQxscDgfwrvgEcETYDSQczH1rGlrlT0NZRfxkckAsFONYqwmOkTL9OxQCtxeDYkZwrJc84a9fpHLBq51006hcHmm10");
    }
    return stripePromise;
  };

  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'sk_test_51NazlFItNQxscDgf0aSd1aY7d0EFn4uY19oGDxfH2pN1r7MBIAVJ1SQ9ZaUIr4l6GUFcJz63Cjxo9hbuir2H1VWY000bU3oYXO',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  }
  return (
    <>
      <Elements stripe={stripePromise}>
        <div>Bananas</div>
      </Elements>
      Batata
    </>

  );
};

export default Payment;
