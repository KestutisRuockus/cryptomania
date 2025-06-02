import { useTheme } from "../../context/ThemeContext";
import { IoIosMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
const SwitchThemeButton = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-600 w-14 h-6 rounded-full relative transition-colors duration-300 text-sm cursor-pointer"
    >
      <IoSunnySharp className="absolute left-[7px] top-[5px] z-10 text-yellow-300" />
      <IoIosMoon className="absolute right-[7px] top-[5px] z-10 text-blue-500" />
      <span
        className={`absolute top-0.5 left-1  h-5 w-5 rounded-full transition-all duration-300 transform ${
          theme === "dark"
            ? "translate-x-7 bg-amber-300"
            : "translate-x-0 bg-blue-500"
        }`}
      ></span>
    </button>
  );
};

export default SwitchThemeButton;
