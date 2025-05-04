import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../provider/themeProvider";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

// Fake product data
const fakeData = [
  { name: "Product A", totalOrderCount: 120 },
  { name: "Product B", totalOrderCount: 95 },
  { name: "Product C", totalOrderCount: 80 },
  { name: "Product D", totalOrderCount: 65 },
  { name: "Product E", totalOrderCount: 40 },
  { name: "Product F", totalOrderCount: 30 },
];

const BestSellingProductsChart = () => {
  const { theme } = useContext(ThemeContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulate data processing
    const preparedData = fakeData.map((item, index) => ({
      name: item.name,
      value: item.totalOrderCount,
      color: COLORS[index % COLORS.length],
    }));
    setChartData(preparedData);
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      } p-4 md:p-6 rounded-lg shadow-md w-full h-full`}
    >
      <h2 className="text-lg font-bold mb-4">{"Best Selling Products"}</h2>
      <div className="w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="60%"
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px 16px",
                  paddingTop: "16px",
                  fontSize: "14px",
                }}
                formatter={(value, entry, index) => (
                  <span className="text-sm">{chartData[index]?.name}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">{"No data available"}</p>
        )}
      </div>
    </div>
  );
};

export default BestSellingProductsChart;
