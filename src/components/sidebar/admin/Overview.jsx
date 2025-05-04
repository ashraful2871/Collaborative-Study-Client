import React from "react";
import WeeklyChart from "./WeeklyChart";
import BestSellingProductsChart from "./BestSellingProductsChart";

const Overview = () => {
  return (
    <div>
      <h2 className="text-3xl  font-bold mb-5 text-center">Overview</h2>

      {/* weekly seals chart */}
      <div>
        <WeeklyChart></WeeklyChart>
      </div>
      {/* best selling products in website */}
      <div>
        <BestSellingProductsChart></BestSellingProductsChart>
      </div>
    </div>
  );
};

export default Overview;
