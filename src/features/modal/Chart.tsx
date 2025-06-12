import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import { FilterBarContext } from "../../context/FilterBarContext";
import { popularCurrencies } from "../../data/currenciesList";

type ChartData = {
  date: number;
  price: number;
};

const ChartComponent = ({
  coinId,
  daysInterval,
}: {
  coinId: string;
  daysInterval: number;
}) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency } = filterContext;
  const symbol =
    popularCurrencies.find((item) => item.code === currency)?.symbol ?? "";

  useEffect(() => {
    if (!coinId) return;

    setLoadingChart(true);
    const url = import.meta.env.VITE_BASE_URL;

    const fetchChartData = () => {
      axios
        .get(`${url}/coins/${coinId}/market_chart`, {
          params: {
            vs_currency: currency,
            days: daysInterval,
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
  }, [coinId, currency, daysInterval]);

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
          formatter={(value: number) => `${symbol}${value.toFixed(2)}`}
          labelFormatter={(label: number) => {
            const date = new Date(label);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "long",
            });

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
  const possibleDaysIntervals = [7, 14, 30];
  type DaysInterval = (typeof possibleDaysIntervals)[number];
  const [daysInterval, setDaysInterval] = useState<DaysInterval>(
    possibleDaysIntervals[0]
  );

  return (
    <div className="w-full h-full pb-6 md:pb-0">
      <ChartComponent coinId={coinId} daysInterval={daysInterval} />
      <div className="flex justify-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <p className="text-[var(--color-text-primary)] font-semibold">
            Period (days):
          </p>
          {possibleDaysIntervals.map((interval) => (
            <div
              key={interval}
              onClick={() => setDaysInterval(interval)}
              className={`w-10 text-center border-2 border-[var(--color-bg-primary)] ${
                interval === daysInterval
                  ? "bg-[var(--color-bg-primary)] font-bold"
                  : "bg-[var(--color-bg-secondary)] hover:opacity-60"
              } text-[var(--color-text-primary)] rounded-lg px-1.5
            cursor-pointer transition-all duration-500`}
            >
              {interval}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
