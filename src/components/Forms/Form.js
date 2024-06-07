import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Users } from "../../Pages/context/context";
export const Form = (props) => {
  const boxRegister = {
    display: "flex",
    placeItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };
  const inputRegister = {
    width: "470px",
  };
  const styleInput = {
    border: "2px solid #80a9e6",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState("");

  const userNow = useContext(Users);
  // console.log(userNow);

  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

  async function Submit(e) {
    e.preventDefault();

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/${props.endPoint}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        }
      );
      const token = res.data.data.token;
      const userDetails = res.data.data.user;
      // console.log(`it is token ${token}`);
      // console.log(userDetails);
      userNow.setAuth({ token, userDetails });
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div>
      <div id="box" style={props.boxRegister && boxRegister}>
        <div id="inputBox" style={props.inputRegister && inputRegister}>
          <span className="borderLine"></span>
          <form id="form" onSubmit={Submit}>
            <h2 id="signUp">{props.names}</h2>
            <label htmlFor="name">Name:</label>
            <input
              style={props.styleInput && styleInput}
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name...."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* {name === "" && accept && <p>UserName is required</p>} */}
            <label htmlFor="email">Email:</label>
            <input
              style={props.styleInput && styleInput}
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Email...."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {accept && emailError === 422 && <p>Email is already been taken</p>} */}
            <label htmlFor="password">password:</label>
            <input
              style={props.styleInput && styleInput}
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="password...."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {password.length < 8 && accept && (
              <p>password must be more than 8 char</p>
            )} */}
            <label htmlFor="repeat">Repeat Password:</label>
            <input
              style={props.styleInput && styleInput}
              className="input"
              type="password"
              name="repeat"
              id="repeat"
              placeholder="Repeat Password...."
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            {/* {passwordR !== password && accept && <p>Password dose not match</p>} */}
            <div style={{ textAlign: "center" }}>
              <button type="submit">{props.button}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
