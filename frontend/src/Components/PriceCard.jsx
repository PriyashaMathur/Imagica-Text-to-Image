import React from "react";
import axios from "axios";
const PriceCard = (props) => {
  const handlePayment = async (planId) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create_order`,
      { planId },
    );
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "Imagica",
      description: "Credits Purchased",
      handler: async function (response) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
          {
            ...response,
            planId,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
        );
        if (data.success) {
          window.location.reload();
        }
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <div className="h-60 w-50 border border-2 flex flex-col gap-1 items-center pt-7 rounded-4xl  bg-gradient-to-b from-pink-150 to-yellow-50">
      <div className="text-2xl font-bold ">{props.plan}</div>
      <div className="mt-3 font-medium">{props.description}</div>
      <div className="mt-3 text-lg">
        ₹{props.price}/{props.credits}credits
      </div>
      <div className="mt-9 border w-33 flex items-center justify-center rounded-2xl bg-black text-white active:bg-gray-500">
        <button className="w-33" onClick={() => handlePayment(props.plan)}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
