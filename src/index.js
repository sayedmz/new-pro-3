// php artisan migrate:fresh   لتحدسث المعلومات في  bankend
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./all.min.css";
import App from "./App";
import UserPro from "./Pages/context/context";
import { BrowserRouter as Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Routes>
      <UserPro>
        <App />
      </UserPro>
    </Routes>
  </>
);
//1ere
//import { Color } from "./Pages/context/context";
// <Routes>
//   <Color.Provider value="red">
//     <App />
//   </Color.Provider>
// </Routes>;
