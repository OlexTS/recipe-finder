import { Link } from "react-router";
import { useState } from "react";
import css from "./Header.module.css";
import logo from "../../assets/logo_white_bg.svg";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const [mode, setMode] = useState(true);
  return (
    <header className={css.header}>
      <Link to="/">
        <img className={css.logo} src={logo} alt="logo" width="150" />
      </Link>
      <nav>
        <ul className={css.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorite">Favorites</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => setMode(!mode)}>
        {mode ? <MdDarkMode /> : <MdOutlineLightMode />}
      </button>
    </header>
  );
};

export default Header;
