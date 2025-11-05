import classes from "../Styled-component/Layout.module.css";
import Nav from "./Navbar/Nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={classes.main}>
        <div class={classes.container}>{children}</div>
      </main>
    </>
  );
}
