import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Users } from "../context/context";
import LoadingScreen from "../../components/Loading/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  // get User
  const context = useContext(Users);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);
  //cookie  npm i universal-cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  // console.log(getToken);

  // send refresh token
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: { Authorization: "Bearer " + getToken },
          })
          .then((data) => {
            // console.log(data);
            cookie.set("Bearer", data.data.token, { path: "/" });
            context.setAuth((prev) => {
              // خلي كل شيئ عل حاله ولكن تةكن قم بتغييرها على الشكل التالي
              // return { ...prev, token: data.data.token };
              return { userDetails: data.data.user, token: data.data.token };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);
  return loading ? <LoadingScreen /> : <Outlet />;
}
