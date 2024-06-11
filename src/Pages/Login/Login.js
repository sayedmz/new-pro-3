import axios from "axios";
import React, { useContext, useState } from "react";
import { Users } from "../../Pages/context/context";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);
  const nav = useNavigate(); //  تستعمل لتوجية المستخدم الى صفحة معينة
  const user = useContext(Users);

  //cookies
  const cookie = new Cookies();

  // console.log(user);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;

      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
      setAccept(true);
    }
  }
  return (
    <div style={{ background: "radial-gradient(#80a9e6, white, #9d3477)" }}>
      <Header />
      <div
        id="box"
        style={{
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div id="inputBox" style={{ width: "470px" }}>
          <span className="borderLine"></span>
          <form id="form" onSubmit={Submit}>
            <h2 id="signUp">Log In</h2>

            <label htmlFor="email">Email:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Email...."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">password:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="password...."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">password must be more than 8 char</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Log In</button>
            </div>

            {accept && err && <p className="error">wrong email and password</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
