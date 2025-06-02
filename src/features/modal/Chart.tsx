import { useLayoutEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = () => {
  const data = [
    { name: "Page A", uv: 400, prices: 2400, date: 27 },
    { name: "Page B", uv: 100, prices: 2800, date: 28 },
    { name: "Page C", uv: 350, prices: 1900, date: 29 },
    { name: "Page D", uv: 400, prices: 2400, date: 30 },
    { name: "Page E", uv: 100, prices: 2800, date: 31 },
    { name: "Page F", uv: 350, prices: 1900, date: 1 },
    { name: "Page G", uv: 350, prices: 1900, date: 2 },
  ];
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="prices" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis dataKey="prices" domain={["auto", "auto"]} />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = () => {
  useLayoutEffect(() => {}, []);

  return (
    <div className="w-full h-full">
      <ChartComponent />
    </div>
  );
};

export default Chart;
