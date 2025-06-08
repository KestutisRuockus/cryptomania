import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaWindowClose } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import Chart from "./Chart";
import useCoinbyId from "../../hooks/useCoinById";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const CryptoModal = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const safeId = id ?? "";
  const { coinData, loading } = useCoinbyId(safeId);

  let currentPriceLinearPercentage;
  if (coinData) {
    currentPriceLinearPercentage =
      ((coinData.market_data.current_price.usd -
        coinData.market_data.low_24h.usd) /
        (coinData.market_data.high_24h.usd -
          coinData.market_data.low_24h.usd)) *
      100;
  }

  return (
    <div
      className={`fixed inset-2 z-50 flex justify-center items-start overflow-y-auto ${
        theme === "light" ? "bg-black/40" : "bg-black/50"
      } rounded-lg`}
    >
      <div className="relative my-12 w-full max-w-3xl bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden p-4 sm:p-8">
        {loading && <LoadingSpinner />}
        {coinData && (
          <>
            <div className="flex flex-wrap items-center gap-4 max-[500px]:mt-12 mb-12">
              <img
                src={coinData.image.small}
                alt={coinData.id + " image"}
                className="w-18"
              />
              <div className="flex gap-2">
                <h2
                  style={{ fontSize: "var(--text-heading-xl)" }}
                  className="text-[var(--color-text-primary)] font-bold"
                >
                  {coinData.name}
                </h2>
                <div
                  style={{ fontSize: "var(--text-caption-md)" }}
                  className="bg-green-700 h-fit px-2 py-1 rounded-lg uppercase text-[var(--color-text-secondary)] font-semibold"
                >
                  {coinData.id}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <dl className="w-full md:w-2/5 flex flex-col gap-4 sm:pl-6">
                <div className="flex flex-col">
                  <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                    Price
                  </dt>
                  <dd
                    style={{ fontSize: "var(--text-heading-lg)" }}
                    className="text-[var(--color-text-primary)] font-semibold"
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coinData.market_data.current_price.usd)}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                    Market Cap
                  </dt>
                  <dd
                    style={{ fontSize: "var(--text-heading-md)" }}
                    className="text-[var(--color-text-primary)] font-semibold"
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coinData.market_data.market_cap.usd)}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                    Total Volume
                  </dt>
                  <dd
                    style={{ fontSize: "var(--text-heading-md)" }}
                    className="text-[var(--color-text-primary)] font-semibold"
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coinData.market_data.total_volume.usd)}
                  </dd>
                </div>
                <div className="flex w-1/2 md:w-full h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${
                        currentPriceLinearPercentage
                          ? currentPriceLinearPercentage
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-green-500 h-full"
                    style={{
                      width: `${
                        currentPriceLinearPercentage
                          ? 100 - currentPriceLinearPercentage
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                      Low 24H
                    </dt>
                    <dd
                      style={{ fontSize: "var(--text-heading-md)" }}
                      className="text-[var(--color-text-primary)] font-semibold"
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coinData.market_data.low_24h.usd)}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                      High 24H
                    </dt>
                    <dd
                      style={{ fontSize: "var(--text-heading-md)" }}
                      className="text-[var(--color-text-primary)] font-semibold"
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coinData.market_data.high_24h.usd)}
                    </dd>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                      Max Supply
                    </dt>
                    <dd
                      style={{ fontSize: "var(--text-heading-md)" }}
                      className="text-[var(--color-text-primary)] font-semibold"
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(+coinData.market_data.max_supply)}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="font-medium p-0 text-[var(--color-text-secondary)]">
                      Circulating Supply
                    </dt>
                    <dd
                      style={{ fontSize: "var(--text-heading-md)" }}
                      className="text-[var(--color-text-primary)] font-semibold"
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coinData.market_data.circulating_supply)}
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="w-full 2xl:w-4/5 flex flex-col justify-between gap-4">
                <div className="w-full h-[300px]">
                  <Chart coinId={coinData.id} />
                </div>
                <div className="w-full flex flex-col gap-4 justify-start items-start sm:pl-6">
                  <div className="flex flex-col gap-4 justify-center w-full md:w-3/5 2xl:w-full">
                    {coinData.links.homepage[0] && (
                      <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] px-2 rounded-lg w-full">
                        <span
                          className="text-[var(--color-text-primary)] w-full truncate"
                          style={{ fontSize: "var(--text-body-lg)" }}
                        >
                          {coinData.links.homepage[0]}
                        </span>
                        <div className="flex justify-end gap-2 w-fit">
                          <a
                            href={coinData.links.homepage[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt className="cursor-pointer text-[var(--color-text-primary)]" />
                          </a>
                          <BsCopy
                            onClick={() => {
                              navigator.clipboard.writeText(
                                coinData.links.homepage[0]
                              );
                              alert(
                                "Copied the text: " + coinData.links.homepage[0]
                              );
                            }}
                            className="cursor-pointer text-[var(--color-text-primary)]"
                          />
                        </div>
                      </div>
                    )}
                    {coinData.links.official_forum_url[0] && (
                      <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] px-2 rounded-lg w-full">
                        <span
                          className="text-[var(--color-text-primary)] w-full truncate"
                          style={{ fontSize: "var(--text-body-lg)" }}
                        >
                          {coinData.links.official_forum_url[0]}
                        </span>
                        <div className="flex justify-end gap-2 w-fit">
                          <a
                            href={coinData.links.official_forum_url[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt className="cursor-pointer text-[var(--color-text-primary)]" />
                          </a>
                          <BsCopy
                            onClick={() => {
                              navigator.clipboard.writeText(
                                coinData.links.official_forum_url[0]
                              );
                              alert(
                                "Copied the text: " +
                                  coinData.links.official_forum_url[0]
                              );
                            }}
                            className="cursor-pointer text-[var(--color-text-primary)]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{ fontSize: "var(--text-heading-sm)" }}
                    className="flex flex-col gap-2"
                  >
                    <p className="font-semibold text-[var(--color-text-secondary)]">
                      Market Cap Rank:{" "}
                      <span
                        style={{ fontSize: "var(--text-heading-md)" }}
                        className="font-bold text-[var(--color-text-primary)]"
                      >
                        {coinData.market_cap_rank}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <FaWindowClose
              onClick={closeModal}
              className="absolute right-4 top-3 text-4xl text-[var(--color-bg-hover)] cursor-pointer hover:opacity-70 transition-opacity duration-300"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoModal;
