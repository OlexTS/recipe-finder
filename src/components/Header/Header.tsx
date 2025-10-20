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
        <img className={css.logo} src={logo} alt="logo" />
      </Link>
      <div className={css.navContainer}>
      <nav className={css.navigation}>
        <ul className={css.list}>
          <li>
            <Link className={css.link} to="/">Home</Link>
          </li>
          <li>
            <Link className={css.link} to="/favorite">Favorites</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => setMode(!mode)} className={css.btn}>
        {mode ? <MdDarkMode className={css.icon} size={30}/> : <MdOutlineLightMode className={css.icon} size={30}/>}
      </button>
</div>
    </header>
  );
};

export default Header;
