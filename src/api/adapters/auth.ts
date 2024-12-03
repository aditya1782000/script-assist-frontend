import { SIGNUP_URL, USER_LOGIN_URL, USER_LOGOUT_URL } from "../../config/apiEndPoints";
import apiClient from "../client/api-client";

export const userLogin = async (data: { email: string; password: string }) => {
  return apiClient({ url: USER_LOGIN_URL, data, method: "POST" });
};

export const registerUser = async (data: {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}) => {
  return apiClient({ url: SIGNUP_URL, data, method: "POST" });
};

export const logout = async () => {
  return apiClient({ url: USER_LOGOUT_URL, method: 'POST' });
};
