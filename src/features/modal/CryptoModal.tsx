import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaWindowClose } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import Chart from "./Chart";

const item = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  asset_platform_id: null,
  block_time_in_minutes: 10,
  categories: ["Cryptocurrency"],
  public_notice: null,
  additional_notices: [],
  description: {
    en: "Bitcoin is a cryptocurrency...",
  },
  market_cap_rank: 1,
  coingecko_rank: 1,
  coingecko_score: 83.924,
  links: {
    homepage: ["https://bitcoin.org/"],
    blockchain_site: ["https://blockchain.info/"],
    official_forum_url: ["https://bitcointalk.org/"],
    chat_url: [],
    announcement_url: [],
    twitter_screen_name: "bitcoin",
    facebook_username: null,
    bitcointalk_thread_identifier: null,
    telegram_channel_identifier: null,
    subreddit_url: "https://reddit.com/r/bitcoin",
    repos_url: {
      github: ["https://github.com/bitcoin/bitcoin"],
    },
  },
  image: {
    thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
    small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  market_data: {
    current_price: {
      usd: 27000,
      eur: 25000,
      // ...other currencies
    },
    market_cap: {
      usd: 500000000000,
      // ...
    },
    total_volume: {
      usd: 35000000000,
      // ...
    },
    high_24h: {
      usd: 28000,
      // ...
    },
    low_24h: {
      usd: 26000,
      // ...
    },
    price_change_24h: -500,
    price_change_percentage_24h: -1.82,
    // ...more data
    circulating_supply: 19000000,
    total_supply: 21000000,
    max_supply: 21000000,
  },
  community_data: {
    twitter_followers: 4000000,
    reddit_average_posts_48h: 30,
    // ...
  },
  developer_data: {
    forks: 3400,
    stars: 60000,
    subscribers: 1200,
    total_issues: 5000,
    closed_issues: 4800,
    pull_requests_merged: 3000,
    pull_request_contributors: 450,
    code_additions_deletions_4_weeks: {
      additions: 2000,
      deletions: 1500,
    },
    commit_count_4_weeks: 50,
  },
  public_interest_stats: {
    alexa_rank: 30000,
    bing_matches: null,
  },
  status_updates: [],
  last_updated: "2025-06-02T10:00:00Z",
};

const CryptoModal = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };

  const currentPriceLinearPercentage =
    ((item.market_data.current_price.usd - item.market_data.low_24h.usd) /
      (item.market_data.high_24h.usd - item.market_data.low_24h.usd)) *
    100;

  return (
    <div
      className={`fixed inset-2 z-50 flex justify-center items-start overflow-y-auto ${
        theme === "light" ? "bg-black/40" : "bg-black/50"
      } rounded-lg`}
    >
      <div className="relative my-12 w-full max-w-3xl bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden p-4 sm:p-8">
        <div className="flex flex-wrap items-center gap-4 max-[500px]:mt-12 mb-12">
          <img
            src={item.image.small}
            alt={item.id + " image"}
            className="w-18"
          />
          <div className="flex gap-2">
            <h2
              style={{ fontSize: "var(--text-heading-xl)" }}
              className="text-[var(--color-text-primary)] font-bold"
            >
              {item.name}
            </h2>
            <div
              style={{ fontSize: "var(--text-caption-md)" }}
              className="bg-green-700 h-fit px-2 py-1 rounded-lg uppercase text-[var(--color-text-secondary)] font-semibold"
            >
              {item.id}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <dl className="w-3/5 max-sm:3/5 sm:m-auto md:w-2/5 flex flex-col gap-4 pl-6 sm:pl-0">
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
                }).format(item.market_data.current_price.usd)}
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
                }).format(item.market_data.market_cap.usd)}
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
                }).format(item.market_data.total_volume.usd)}
              </dd>
            </div>
            <div className="flex w-full h-2 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full"
                style={{ width: `${currentPriceLinearPercentage}%` }}
              ></div>
              <div
                className="bg-green-500 h-full"
                style={{ width: `${100 - currentPriceLinearPercentage}%` }}
              ></div>
            </div>
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between">
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
                  }).format(item.market_data.low_24h.usd)}
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
                  }).format(item.market_data.high_24h.usd)}
                </dd>
              </div>
            </div>
            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
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
                  }).format(item.market_data.max_supply)}
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
                  }).format(item.market_data.circulating_supply)}
                </dd>
              </div>
            </div>
          </dl>
          <div className="w-full 2xl:w-3/5 flex flex-col justify-between gap-4">
            <div className="w-full h-[250px]">
              <Chart />
            </div>
            <div className="w-2/3 max-sm:w-full sm:m-auto md:w-full flex flex-col-reverse 2xl:flex-row justify-start 2xl:justify-between items-start 2xl:items-end">
              <div className="flex flex-col gap-4 justify-center pl-6">
                <div className="flex justify-between items-center gap-2 bg-[var(--color-bg-primary)] px-2 rounded-lg w-full">
                  <span
                    style={{ fontSize: "var(--text-body-lg)" }}
                    className="text-[var(--color-text-primary)]"
                  >
                    {item.links.homepage}
                  </span>
                  <div className="flex justify-end gap-2">
                    <a href={item.links.homepage[0]} target="_blank">
                      <FaExternalLinkAlt className="cursor-pointer text-[var(--color-text-primary)]" />
                    </a>
                    <BsCopy
                      onClick={() => {
                        navigator.clipboard.writeText(item.links.homepage[0]);
                        alert("Copied the text: " + item.links.homepage[0]);
                      }}
                      className="cursor-pointer text-[var(--color-text-primary)]"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2 bg-[var(--color-bg-primary)] px-2 rounded-lg w-full">
                  <span
                    style={{ fontSize: "var(--text-body-lg)" }}
                    className="text-[var(--color-text-primary)]"
                  >
                    {item.links.official_forum_url}
                  </span>
                  <div className="flex justify-end gap-2">
                    <a href={item.links.official_forum_url[0]} target="_blank">
                      <FaExternalLinkAlt className="cursor-pointer text-[var(--color-text-primary)]" />
                    </a>
                    <BsCopy
                      onClick={() => {
                        navigator.clipboard.writeText(
                          item.links.official_forum_url[0]
                        );
                        alert(
                          "Copied the text: " + item.links.official_forum_url[0]
                        );
                      }}
                      className="cursor-pointer text-[var(--color-text-primary)]"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "var(--text-heading-sm)" }}
                className="flex flex-col gap-2 pl-6"
              >
                <p className="font-semibold text-[var(--color-text-secondary)]">
                  Market Cap Rank:{" "}
                  <span
                    style={{ fontSize: "var(--text-heading-md)" }}
                    className="font-bold text-[var(--color-text-primary)]"
                  >
                    {item.market_cap_rank}
                  </span>
                </p>
                <p className="font-semibold text-[var(--color-text-secondary)]">
                  CoinGecko Rank:{" "}
                  <span
                    style={{ fontSize: "var(--text-heading-md)" }}
                    className="font-bold text-[var(--color-text-primary)]"
                  >
                    {item.coingecko_rank}
                  </span>
                </p>
                <p className="font-semibold text-[var(--color-text-secondary)]">
                  CoinGecko Score:{" "}
                  <span
                    style={{ fontSize: "var(--text-heading-md)" }}
                    className="font-bold text-[var(--color-text-primary)]"
                  >
                    {item.coingecko_score}
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
      </div>
    </div>
  );
};

export default CryptoModal;
