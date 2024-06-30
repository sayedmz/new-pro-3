import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../context/context";
export const NewProduct = () => {
  const [title, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);

  // console.log(image);
  const nav = useNavigate();
  const context = useContext(Users);
  const token = context.auth.token;
  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    const fromData = new FormData();
    fromData.append("title", title);
    fromData.append("description", description);
    fromData.append("image", image);
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/create`,
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
            <h2 id="signUp">Create Products</h2>
            <label htmlFor="name">Tittle:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Tittle...."
              value={title}
              onChange={(e) => setTittle(e.target.value)}
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
              <button type="submit">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewProduct;
