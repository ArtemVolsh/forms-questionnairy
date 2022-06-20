import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, registration } from "../ApiRequests/apiRequests";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <div>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <button onClick={() => dispatch(login(email, password))}>Логин</button>
      <button onClick={() => dispatch(registration(email, password))}>
        Регистрация
      </button>
    </div>
  );
};
