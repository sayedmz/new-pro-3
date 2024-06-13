import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Users } from "../context/context";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [run, setRun] = useState(0);

  const context = useContext(Users);
  const token = context.auth.token;

  console.log(context);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })

      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [run]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const showProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td> <td>{product.title}</td>{" "}
      <td>{product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "black", padding: " 0 20px", cursor: "pointer" }}
          ></i>
        </Link>
        <i
          onClick={() => deleteUser(product.id)}
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
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
};
export default Products;
