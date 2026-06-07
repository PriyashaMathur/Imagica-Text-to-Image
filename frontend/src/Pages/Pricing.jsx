import React from "react";
import PriceCard from "../Components/PriceCard";
import NavBar from "../Components/NavBar";
import data from "../Components/data.js"
const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-yellow-200 gap-10 flex flex-col">
      <NavBar/>
      <div className="flex flex-col items-center justify-center mt-20 gap-19">
        <div className="text-6xl font-bold">Plans And Pricing</div>
      <div className="flex gap-9">
        {data.map((item, idx) => (
          <PriceCard
            key={item.id || idx}
            plan={item.plan || "PLAN"}
            description={item.description || ""}
            price={item.price || ""}
            credits={item.credits || ""}
          />
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default Pricing;
