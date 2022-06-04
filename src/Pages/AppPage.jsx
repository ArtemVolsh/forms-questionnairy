import React, { FC, useContext, useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";

import UserService from "../services/UserService";

import { logoutRequest } from "../ApiRequests/apiRequests";
import { useDispatch, useSelector } from "react-redux";

export const AppPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //check auth
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (isAuth) {
    return (
      <div>
        <LoginPage />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {isAuth ? `Пользователь авторизован ${user.email}` : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h1>
        {user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
      </h1>
      <button onClick={() => dispatch(logoutRequest())}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};
