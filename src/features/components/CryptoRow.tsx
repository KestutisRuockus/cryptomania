import { FaRegStar } from "react-icons/fa6";
import type { CryptoRowProps } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

const CryptoItem = ({ item, index, currency }: CryptoRowProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = (id: string) => {
    navigate(`/modal/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <tr
      onClick={() => openModal(item.id)}
      className={`${
        index % 2 === 0
          ? "bg-[var(--color-bg-secondary)]"
          : "bg-[var(--color-bg-primary)]"
      } text-[var(--color-text-secondary)] cursor-pointer`}
    >
      <th className="flex justify-start items-center m-auto my-2 pl-6">
        {<FaRegStar className="text-xl mr-4 cursor-pointer" />}
        <img src={item.image} alt="image" className="w-5 mr-1" />
        <span className="uppercase font-bold">{item.symbol}</span>
      </th>
      <th className="cursor-pointer hidden min-[500px]:table-cell">
        {item.name}
      </th>
      <th>{currency + item.current_price}</th>
      <th className="hidden xl:table-cell">{item.total_volume}</th>
      <th
        className={`${
          item.price_change_percentage_1h_in_currency >= 0
            ? "text-green-600"
            : "text-red-600"
        } hidden xl:table-cell`}
      >
        {item.price_change_percentage_1h_in_currency
          ? item.price_change_percentage_1h_in_currency + "%"
          : "-"}
      </th>
      <th
        className={`${
          item.price_change_percentage_24h_in_currency >= 0
            ? "text-green-600"
            : "text-red-600"
        } hidden md:table-cell`}
      >
        {item.price_change_percentage_24h_in_currency
          ? item.price_change_percentage_24h_in_currency + "%"
          : "-"}
      </th>
      <th
        className={`${
          item.price_change_percentage_7d_in_currency !== undefined &&
          item.price_change_percentage_7d_in_currency >= 0
            ? "text-green-600"
            : "text-red-600"
        } hidden lg:table-cell`}
      >
        {item.price_change_percentage_7d_in_currency
          ? item.price_change_percentage_7d_in_currency + "%"
          : "-"}
      </th>
    </tr>
  );
};

export default CryptoItem;
// toFixed(2)
