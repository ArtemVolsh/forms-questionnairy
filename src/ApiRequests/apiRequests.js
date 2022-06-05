import axios from "axios";
import AuthService from "../services/AuthService.js";
import { setUser, logout } from "../Reducers/userReducer.js";
import { API_URL } from ".";
const { log } = console;

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(email, password);
      log(response);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setUser(response.data.user));
    } catch (e) {
      log("Login is failed! ❌");
      log(e.response?.data?.message);
    } finally {
      log("Login function is finished! ✅");
    }
  };
};

export const registration = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.registration(email, password);
      log(response);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setUser(response.data.user));
    } catch (e) {
      log("Registration is failed! ❌");
      log(e.response?.data?.message);
    } finally {
      log("Registration function is finished! ✅");
    }
  };
};

export const logoutRequest = () => {
  return async (dispatch) => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (e) {
      log("Logout is failed! ❌");
      log(e.response?.data?.message);
    } finally {
      log("Logout function is finished! ✅");
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      log(response);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setUser(response.data.user));
    } catch (e) {
      log("Check auth is failed! ❌");
      log(e.response?.data?.message);
    } finally {
      log("CheckAuth function is finished! ✅");
    }
  };
};
