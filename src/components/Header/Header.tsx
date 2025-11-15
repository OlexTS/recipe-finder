import { Link } from "react-router";
import { useEffect, useState } from "react";
import css from "./Header.module.css";
import logo from "../../assets/logo_white_bg.svg";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  return (
    <header className={css.header}>
      <Link to="/">
        <img className={css.logo} src={logo} alt="logo" />
      </Link>
      <div className={css.navContainer}>
        <nav className={css.navigation}>
          <ul className={css.list}>
            <li>
              <Link className={css.link} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={css.link} to="/favorite">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={() => setIsDark((prev) => !prev)} className={css.btn}  aria-label="Toggle theme">
          {isDark ? (
            <MdDarkMode className={`${css.icon} themed-icon`} size={30} />
          ) : (
            <MdOutlineLightMode className={`${css.icon} themed-icon`} size={30} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
