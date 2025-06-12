import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import logo from "/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { useContext, useState } from "react";
import SwitchThemeButton from "../ui/SwitchThemeButton";
import { FilterBarContext } from "../../context/FilterBarContext";

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { setPage, setSearchQuery } = filterContext;

  const navigateAndResetContextValues = () => {
    setPage(1);
    setSearchQuery("");
    toggleNavbarWindow();
  };

  const toggleNavbarWindow = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <header
      className="w-full flex justify-between items-center px-4"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <img src={logo} alt="logo" className="w-16 z-50" />
      <nav
        className={`flex flex-col md:flex-row gap-2 md:gap-6 items-end md:items-center md:justify-end pr-24 md:px-6 w-full md:w-fit py-12 md:p-2 absolute md:static ${
          isNavbarOpen ? "top-0" : "top-[-100%]"
        } right-0 transition-all duration-300 ease-in bg-[var(--color-bg-primary)] rounded-b-md md:rounded-md z-40`}
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          fontSize: "var(--text-body-md)",
        }}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={navigateAndResetContextValues}
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
        <SwitchThemeButton />
      </nav>
      <span
        onClick={toggleNavbarWindow}
        className="md:hidden cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in text-3xl z-50"
        style={{ color: "var(--color-text-primary)" }}
      >
        {isNavbarOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
      </span>
    </header>
  );
};

export default Header;
