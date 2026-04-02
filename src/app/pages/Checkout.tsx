import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, Building2, Truck, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/useCart';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryMethod: 'standard'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'invoice',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = shippingInfo.deliveryMethod === 'express' ? 25.00 : 10.00;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const handlePlaceOrder = () => {
 

    toast.success('Order placed successfully! You will receive a confirmation email shortly.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {step === 'cart' && 'Shopping Cart'}
        {step === 'shipping' && 'Shipping Information'}
        {step === 'payment' && 'Payment & Review'}
      </h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'cart' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
            1
          </div>
          <span className={`hidden sm:inline ${step === 'cart' ? 'font-semibold' : ''}`}>Cart</span>
        </div>
        <div className={`w-16 h-1 mx-2 ${step !== 'cart' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-blue-600 text-white' : step === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
            2
          </div>
          <span className={`hidden sm:inline ${step === 'shipping' ? 'font-semibold' : ''}`}>Shipping</span>
        </div>
        <div className={`w-16 h-1 mx-2 ${step === 'payment' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
            3
          </div>
          <span className={`hidden sm:inline ${step === 'payment' ? 'font-semibold' : ''}`}>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Cart Step */}
          {step === 'cart' && (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-lg text-blue-600 font-bold">${item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shipping Step */}
          {step === 'shipping' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-blue-600" />
                Delivery Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ZIP"
                  />
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Delivery Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        checked={shippingInfo.deliveryMethod === 'standard'}
                        onChange={() => setShippingInfo({ ...shippingInfo, deliveryMethod: 'standard' })}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Standard Delivery (3-5 business days)</p>
                        <p className="text-sm text-gray-600">$10.00</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        checked={shippingInfo.deliveryMethod === 'express'}
                        onChange={() => setShippingInfo({ ...shippingInfo, deliveryMethod: 'express' })}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Express Delivery (1-2 business days)</p>
                        <p className="text-sm text-gray-600">$25.00</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentInfo.method === 'invoice'}
                      onChange={() => setPaymentInfo({ ...paymentInfo, method: 'invoice' })}
                      className="mr-3"
                    />
                    <Building2 className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-semibold">Invoice (Net 30)</p>
                      <p className="text-sm text-gray-600">Payment due within 30 days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentInfo.method === 'card'}
                      onChange={() => setPaymentInfo({ ...paymentInfo, method: 'card' })}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay immediately</p>
                    </div>
                  </label>
                </div>

                {paymentInfo.method === 'card' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary for Payment Step */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              {step !== 'cart' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-blue-600">
                  ${step === 'cart' ? totalPrice.toFixed(2) : finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('shipping')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Proceed to Shipping
              </button>
            )}

            {step === 'shipping' && (
              <div className="space-y-2">
                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
                <button
                  onClick={() => setStep('cart')}
                  className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back to Cart
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-2">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setStep('shipping')}
                  className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
