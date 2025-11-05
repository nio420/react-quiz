import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import classes from "../../Styled-component/Account.module.css";

export default function Account() {
  const { currentUser, Logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await Logout();
      navigate("/login"); // or "/" if you want to go home
    } catch (err) {
      console.log("Logout failed:", err);
    }
  }

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/signup" className="nav-link signup-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        </>
      )}
    </div>
  );
}
