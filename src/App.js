import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import { Home } from "./Pages/Home/Home";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { User } from "./Pages/User/User";
import { UpdateUser } from "./Pages/UpdateUser/UpdateUser";
import CreateUsers from "./Pages/create Users/CreateUsers";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import PersistLogin from "./Pages/PersistLogin/PersistLogin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<User />} />
              <Route path="user/create" element={<CreateUsers />} />
              <Route path="users/:id" element={<UpdateUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
