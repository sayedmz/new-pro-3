import axios from "axios";
import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Users } from "../../Pages/context/context";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate(); //  تستعمل لتوجية المستخدم الى صفحة معينة
  const user = useContext(Users);
  // console.log(user);
  //cookies
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" }); //, { path: "/" }   فيني نضعها او لا
      const userDetails = res.data.data.user;
      // console.log(`it is token ${token}`);
      // console.log(userDetails);
      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
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
            <h2 id="signUp">Register</h2>
            <label htmlFor="name">Name:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name...."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 2 && accept && (
              <p className="error">Name must be more than 2 char</p>
            )}
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
            {accept && emailError && (
              <p className="error">Email is already been taken</p>
            )}
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
            <label htmlFor="repeat">Repeat Password:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="password"
              name="repeat"
              id="repeat"
              placeholder="Repeat Password...."
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {passwordConfirmation !== password && accept && (
              <p className="error">Password dose not match</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
