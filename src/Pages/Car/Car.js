import React, { useContext, useEffect, useState } from "react";

import "./Car.css";
import axios from "axios";
import { Users } from "../context/context";
import { Link } from "react-router-dom";
const Car = () => {
  const [cars, setCars] = useState([]);
  const [run, setRun] = useState(0);
  const context = useContext(Users);
  const token = context.auth.token;
  console.log(cars);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setCars(data.data))

      .catch((err) => console.log(err));
  }, [run]);

  async function deleteCar(id) {
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

  const showCars = cars.map((car, index) => (
    <div id="cards" key={index}>
      <img src={car.image} alt="car" />
      <div className="para">
        <div>
          <h2>{car.title}</h2>
          <p>{car.description}</p>
        </div>
        <div className="item">
          <Link to={`${car.id}`}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "black", padding: " 0 20px", cursor: "pointer" }}
            ></i>
          </Link>
          <Link>
            <i
              onClick={() => deleteCar(car.id)}
              className="fa-solid fa-user-minus"
              style={{ color: "red", padding: " 0 20px", cursor: "pointer" }}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  ));
  return <div id="containerCar">{showCars}</div>;
};

export default Car;
