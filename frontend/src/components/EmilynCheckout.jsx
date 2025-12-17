import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import emilynApi from "../api/emilynApi";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function CheckoutForm({ cart, customer }) {
  const stripe = useStripe(), elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const calculateTotal = () =>
    cart.items.reduce((s, i) => s + i.bakeryItemPrice * i.quantity, 0).toFixed(2);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await emilynApi.post("/pay/create-payment-intent", {
        customerName: customer.name,
        customerEmail: customer.email,
        items: cart.items.map(({ productId, bakeryItemName, bakeryItemPrice, quantity }) => ({
          productId, name: bakeryItemName, price: bakeryItemPrice, quantity
        }))
      });
      const card = elements.getElement(CardElement);
      if (!data.clientSecret || !card) throw new Error("Oops,Stripe initialization has failed.");
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card, billing_details: customer }
      });
      if (result.error) throw new Error(result.error.message);
      const orderRes = await emilynApi.post("/orders/create", {
        items: cart.items.map(i => ({
          productId: i.productId, quantity: i.quantity, price: i.bakeryItemPrice
        })),
        itemsPrice: +calculateTotal(),
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: +calculateTotal(),
        paymentMethod: "stripe",
        paymentResult: {
          id: result.paymentIntent.id,
          status: "succeeded",
          email_address: customer.email
        },
        shippingAddress: { addressLine1: shippingAddress }
      });
      setSuccess({
        message: "Payment successful. Thank you for your order.) ",
        orderId: orderRes.data._id
      });
      localStorage.removeItem("emilyn_cart");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Checkout has failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (!cart?.items?.length)
    return <p className="text-center mt-20">Your cart is empty!🛒</p>;
  return (
    <div className="max-w-xl bg-white p-6 rounded shadow mx-auto mt-10">
      <h3 className="text-xl font-semibold mb-4">Checkout – Emilyn&apos;s Bakehouse</h3>
      <div className="mb-4"><strong>Order Total:</strong> AED {calculateTotal()}</div>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {success ? (
        <div className="text-green-600 mb-3">
          {success.message}<br />
          <strong>Order ID:</strong> {success.orderId}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 border rounded">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          <input
            required
            placeholder="Please Enter Your Shipping Address Here!"
            className="w-full p-2 border rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
          <button
            disabled={!stripe || loading}
            className="w-full py-2 bg-pink-500 text-white rounded"
          >
            {loading ? "Processing your payment...Kindly Wait and Don't Refresh or Close Window!" : `Pay AED ${calculateTotal()}`}
          </button>
        </form>
      )}
    </div>
  );
}
export default function EmilynCheckoutWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}