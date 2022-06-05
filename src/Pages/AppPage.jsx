import { useEffect, useId, useState } from "react";
import { LoginPage } from "./LoginPage";

import UserService from "../services/UserService";

import { logoutRequest, checkAuth } from "../ApiRequests/apiRequests";
import { useDispatch, useSelector } from "react-redux";

export const AppPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);

  const id = useId();

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
    // eslint-disable-next-line
  }, []);

  console.log("users: 👇");
  console.log(users);
  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      console.log("Response: 👇");
      console.log(response);
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h4>{isAuth ? `User authorized ${user.email}` : "АВТОРИЗУЙТЕСЬ"}</h4>
      <h4>
        {user.isActivated ? "Account verificated" : "Account NOT verificated"}
      </h4>
      <div>
        <button onClick={() => getUsers()}>Получить пользователей!</button>
      </div>
      <div id={id}>
        {users.map((item) => (
          <p>{item.email}</p>
        ))}
      </div>
    </div>
  );
};
