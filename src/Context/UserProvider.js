import React, { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const dayNotifi = Math.abs(userInfo.reminig);
    setUser(userInfo);
    if(dayNotifi > 0)
    {
      setNotification(...notification,[{_id:1,text:`You wont be able to access your account after ${dayNotifi} days, please buy a package.`,bg:'tomato', buy:true}])
    }
    if (!userInfo) history("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
