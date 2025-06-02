import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-[85vh] flex flex-col justify-center items-center gap-6">
      <span className="uppercase font-bold text-3xl">404 Not Found</span>
      <NavLink
        to="/"
        className="bg-[var(--color-btn-bg)] text-[var(--color-btn-text)] hover:bg-[var(--color-btn-bg-hover)] hover:text-[var(--color-btn-text-hover)] px-6 py-2 rounded-full transition-colors duration-300"
      >
        Go to Home page
      </NavLink>
    </div>
  );
};

export default NotFound;
