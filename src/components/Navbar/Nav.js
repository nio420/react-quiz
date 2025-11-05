import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.bg.png";
import classes from "../../Styled-component/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" class={classes.brand}>
            <img src={logo} alt=" no img here" />
            <h3>Learning for Omit </h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
