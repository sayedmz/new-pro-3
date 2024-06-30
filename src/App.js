import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import { Home } from "./Pages/Home/Home";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { User } from "./Pages/User/User";
import { UpdateUser } from "./Pages/User/UpdateUser";
import CreateUsers from "./Pages/User/CreateUsers";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import PersistLogin from "./Pages/PersistLogin/PersistLogin";
import { About } from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import NewProduct from "./Pages/Products/NewProduct";
import UpdateProduct from "./Pages/Products/UpdateProduct";
import Car from "./Pages/Car/Car";
import NewCar from "./Pages/Car/NewCar";
import UpdateCar from "./Pages/Car/UpdateCar";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<User />} />
              <Route path="user/create" element={<CreateUsers />} />
              <Route path="users/:id" element={<UpdateUser />} />

              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />

              <Route path="cars" element={<Car />} />
              <Route path="car/createCar" element={<NewCar />} />
              <Route path="Cars/:id" element={<UpdateCar />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
