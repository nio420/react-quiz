import classes from "../Styled-component/Button.module.css";

export default function button({ className, children, ...rest }) {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
