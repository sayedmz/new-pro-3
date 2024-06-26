import axios from "axios";
import React, { useContext, useState } from "react";
import { Users } from "../context/context";
import { useNavigate } from "react-router-dom";

const NewCar = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  const context = useContext(Users);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/product/create",
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
      setAccept(true);
    }
  }

  return (
    <div>
      <div id="box">
        <div id="inputBox">
          <span className="borderLine"></span>
          <form id="form" onSubmit={Submit}>
            <h2 id="signUp">Create Car</h2>
            <label htmlFor="Image">Image:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              type="file"
              className="input"
              id="image"
              placeholder="image"
              name="image"
              required
              onChange={(e) => setImage(e.target.files.item(0))}
            />

            <label htmlFor="name">Tittle:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              type="text"
              className="input"
              id="name"
              name="name"
              placeholder="Title:"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && (
              <p className="error">Tittle must be more than 1 char</p>
            )}

            <label htmlFor="Description">Description:</label>
            <input
              style={{ border: "2px solid #80a9e6" }}
              type="text"
              className="input"
              id="Description"
              name="Description"
              placeholder="Description:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length < 1 && accept && (
              <p className="error">Description must be more than 1 char</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Create car</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCar;
