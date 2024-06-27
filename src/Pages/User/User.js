import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users } from "../context/context";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [run, setRun] = useState(0);

  const context = useContext(Users);
  const token = context.auth.token;

  // console.log(context);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })

      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [run]);

  async function deleteUser(id) {
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/user/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status === 200) {
      setRun((prev) => prev + 1);
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td> <td>{user.name}</td> <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "black", padding: " 0 20px", cursor: "pointer" }}
          ></i>
        </Link>
        <i
          onClick={() => deleteUser(user.id)}
          // onClick={() => deleteUser(user.id)}
          className="fa-solid fa-user-minus"
          style={{ color: "red", padding: " 0 20px", cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div id="user">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
      {/*  للتجريب فقط كيفية انشاء توكن جديد
      <button id="btn" onClick={refresh}>
        Refresh token
      </button> */}
    </div>
  );
};
