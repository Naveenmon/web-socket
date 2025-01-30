import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.body.appendChild(script);
 
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscription = async () => {
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    try {
        const res = await axios.post('http://localhost:3001/api/order/', { email, amount: 1499 });
        console.log('Order created', res.data);

        const razorpayKey = process.env.RAZORPAY_KEY_ID;
        const amount = res.data.amount;
        const id = res.data.id;
        
        const options = {
            key: razorpayKey, // Razorpay key
            amount: amount,  // Amount in paise (e.g., 1499 INR = 149900 paise)
            currency: "INR",
            order_id: id,
            handler: function (response) {
                const paymentId = response.razorpay_payment_id;
                const order_Id = response.razorpay_order_id;
                console.log('Payment Response:', paymentId, order_Id);

                // Call your backend to capture the payment
                axios.post(`http://localhost:3001/api/order/capture`, {
                    payment_id: paymentId,
                    order_id: id,
                    amount: amount,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    console.log('Payment captured successfully:', response.data);
                    navigate('/dashboard')
                })
                .catch(error => {
                    console.error('Error capturing payment:', error.response ? error.response.data : error.message);
                });
            },
            prefill: {
                name: name,
                email: email,
                contact: "9876543210",  // Use actual contact number
            },
            theme: {
                color: "#f58b8b",
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

    } catch (error) {
        console.error('Failed to create order', error.response ? error.response.data : error.message);
    }
};


  const plan = {
    name: 'Premium',
    price: '₹300',
    features: [
      'Access to 50,000+ audiobooks',
      'High-definition audio quality',
      'Listen on up to 3 devices',
      'Advanced recommendations',
      'Monthly credits for 2 premium titles',
      'Offline listening',
      'Ad-free experience'
    ],
    buttonText: 'Subscribe',
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your Membership
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to unlock your next literary adventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          <div 
            className="relative rounded-2xl p-8 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {plan.name}
              </h3>
              <div className="text-5xl font-bold mb-2 text-gray-900">
                {plan.price}
              </div>
              <div className="text-gray-500">
                {plan.period}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-[#ffa3a3]" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-[#ffa3a3] text-white hover:opacity-90"
              onClick={handleSubscription}
            >
              {plan.buttonText}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SubscriptionPlans;
