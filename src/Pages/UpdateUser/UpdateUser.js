import React, { useContext, useEffect, useState } from "react";
import { Users } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate(); //  تستعمل لتوجية المستخدم الى صفحة معينة
  const context = useContext(Users);
  const token = context.auth.token;
  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <div id="box">
        <div id="inputBox">
          <span className="borderLine"></span>
          <form id="form" onSubmit={Submit}>
            <h2 id="signUp">Update User</h2>
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
              <button type="submit">Update User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateUser;
