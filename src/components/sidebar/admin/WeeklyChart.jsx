import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../provider/themeProvider";
const salesData = [
  { date: "2025-04-28", sales: 120 },
  { date: "2025-04-29", sales: 180 },
  { date: "2025-04-30", sales: 150 },
  { date: "2025-05-01", sales: 200 },
  { date: "2025-05-02", sales: 170 },
  { date: "2025-05-03", sales: 220 },
  { date: "2025-05-04", sales: 240 },
];
const WeeklyChart = () => {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("Sales");

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      } p-6 rounded-lg shadow-md`}
    >
      <h2 className="text-lg font-bold mb-4">Sales chart</h2>
      <div className="border-b">
        <button
          className={`mr-4 pb-2 font-semibold ${
            activeTab === "Sales"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Sales")}
        >
          Sales
        </button>
        {/* <button
          className={`pb-2 font-semibold ${
            activeTab === "Orders"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Orders")}
        >
          Orders
        </button> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const formattedDate = new Date(label).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );
                return (
                  <div
                    className={`p-2 rounded shadow ${
                      theme === "dark"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold">Date: {formattedDate}</p>
                    <p>Sales: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {activeTab === "Sales" && (
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16A34A"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          )}
          {/* {activeTab === "Orders" && (
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          )} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
