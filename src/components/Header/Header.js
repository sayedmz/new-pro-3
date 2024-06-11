import { Link } from "react-router-dom";
import "./Header.css";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  // console.log(token);
  async function handleLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  return (
    <nav id="nav">
      <div id="navA">
        <Link to="/" id="navR">
          Home
        </Link>
        <Link to="/about" id="navR">
          About
        </Link>
      </div>
      <div id="navA">
        {!token ? (
          <>
            <Link to="/register" id="navR">
              Register
            </Link>

            <Link to="/login" id="navR">
              login
            </Link>
          </>
        ) : (
          <>
            <Link style={{ width: "150px" }} to="/dashboard" id="navR">
              Dashboard
            </Link>
            <div id="navR" onClick={handleLogOut}>
              Log Out
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
