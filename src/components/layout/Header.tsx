import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import logo from "/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { toggleTheme } = useTheme();

  const toggleModalWindow = () => setIsModalOpen(!isModalOpen);

  return (
    <header
      className="w-full flex justify-between items-center px-4"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <img src={logo} alt="logo" className="w-16 z-50" />
      <nav
        className={`flex flex-col md:flex-row gap-2 md:gap-6 items-end md:items-center md:justify-end pr-24 md:px-6 w-4/5 md:w-fit py-12 md:p-2 absolute md:static ${
          isModalOpen ? "top-0" : "top-[-100%]"
        } right-[10%] transition-all duration-300 ease-in bg-[var(--color-bg-primary)] rounded-b-md md:rounded-md`}
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          fontSize: "var(--text-body-md)",
        }}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `
      ${isActive ? "bg-[var(--color-bg-primary)]" : ""}
      ${
        isActive
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-hover)]"
      } transition-all duration-300 rounded-md border-[var(--color-bg-primary)] border-2 px-6
    `
            }
          >
            {label}
          </NavLink>
        ))}
        {/*  */}
        <button onClick={toggleTheme}>Switch Theme Color</button>
        {/*  */}
      </nav>
      <span
        onClick={toggleModalWindow}
        className="md:hidden cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in text-3xl z-50"
        style={{ color: "var(--color-text-primary)" }}
      >
        {isModalOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
      </span>
    </header>
  );
};

export default Header;
