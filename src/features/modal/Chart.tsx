import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
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
import LoadingSpinner from "../../components/ui/LoadingSpinner";

type ChartData = {
  date: number;
  price: number;
};

const ChartComponent = ({ coinId }: { coinId: string }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

  useEffect(() => {
    if (!coinId) return;

    setLoadingChart(true);
    const fetchChartData = () => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
          params: {
            vs_currency: "usd",
            days: 7,
            interval: "daily",
          },
        })
        .then((result) => {
          const data = result.data.prices.map(
            ([date, price]: [number, number]) => ({
              date,
              price,
            })
          );
          setChartData(data.slice(0, -1));
        })
        .catch((error) =>
          console.log(`error while fetching chart data: ${error}`)
        )
        .finally(() => setLoadingChart(false));
    };

    fetchChartData();
  }, [coinId]);

  if (loadingChart) return <LoadingSpinner />;

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-text-secondary)"
        />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => `${new Date(date).getDate().toString()}d.`}
          tick={{ fontSize: 12, fill: "var(--color-text-primary)" }}
        />
        <YAxis
          width={70}
          tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
          domain={["auto", "auto"]}
          tickFormatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toFixed(2)}`}
          labelFormatter={(label: number) => {
            const date = new Date(label);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "long",
            }); // e.g., Monday

            return `${day}/${month}/${year} (${weekday})`;
          }}
        />
        <CartesianGrid stroke="#ccc" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ coinId }: { coinId: string }) => {
  useLayoutEffect(() => {}, []);

  return (
    <div className="w-full h-full">
      <ChartComponent coinId={coinId} />
    </div>
  );
};

export default Chart;
