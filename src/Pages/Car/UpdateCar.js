import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Users } from "../context/context";
import { useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);
  const id = window.location.pathname.split("/").slice(-1)[0];
  const context = useContext(Users);
  const token = context.auth.token;
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        console.log(data.data[0].image);
        setImage(data.data[0].image);
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/cars");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div id="box">
        <div id="inputBox">
          <span className="borderLine"></span>
          <form id="form" onSubmit={submit}>
            <h2 id="signUp">Update Car</h2>
            <label htmlFor="image">Image: </label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              type="file"
              name="name"
              id="image"
              required
              placeholder="Image..."
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            <label htmlFor="title">Title:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              id="title"
              type="text"
              name="title"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && (
              <p className="error">Tittle must be more than 1 char</p>
            )}
            <label htmlFor="description">Description:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              className="input"
              id="description"
              type="text"
              name="description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length < 1 && accept && (
              <p className="error">Description must be more than 1 char</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type="submit">Update Car</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
