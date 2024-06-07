//context  تستعمل لتخزين معلومات المستخدم لانها امنة بشكل كبير وايضا نستيطيع استعمال هذة المعلومات  فل كل ملفات المشروع
//import { createContext } from "react";
// 1ere  export const Color = createContext(null);
//========================================
import { createContext, useState } from "react";

export const Users = createContext({});

export default function UserPro({ children }) {
  const [auth, setAuth] = useState({});
  return <Users.Provider value={{ auth, setAuth }}>{children}</Users.Provider>;
}
