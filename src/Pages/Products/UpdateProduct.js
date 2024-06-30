import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../context/context";
export const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);

  const id = window.location.pathname.split("/").slice(-1)[0];

  const nav = useNavigate();
  const context = useContext(Users);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })

      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    const fromData = new FormData();
    fromData.append("title", title);
    fromData.append("description", description);
    fromData.append("image", image);
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        fromData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }
  return (
    <div>
      <div id="box">
        <div id="inputBox">
          <span className="borderLine"></span>
          <form id="form" onSubmit={Submit}>
            <h2 id="signUp">Update Products</h2>
            <label htmlFor="name">Tittle:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Tittle...."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && (
              <p className="error">Tittle must be more than 1 char</p>
            )}
            <label htmlFor="email">Description:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="Description...."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* {accept && emailError && (
              <p className="error">Email is already been taken</p>
            )} */}
            <label htmlFor="Image">Image:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="file"
              name="Image"
              id="Image"
              placeholder="Image...."
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            {/* {password.length < 8 && accept && (
              <p className="error">password must be more than 8 char</p>
            )} */}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateProduct;
