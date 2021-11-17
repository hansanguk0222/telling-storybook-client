import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
dotenv.config();

const instance = axios.create({ timeout: 9000 });

instance.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem("accessToken").split(" ")[1];
    verify(token, process.env.REACT_APP_ACCESS_TOKEN_KEY);
    return config;
  } catch (err) {
    const { data, status } = (await axios.post(
      "http://localhost:8000/auth/accesstoken/refresh",
      {
        userId: localStorage.getItem("userId"),
      }
    )) as AxiosResponse<{ userId: number; accessToken: string }, any>;
    localStorage.setItem("accessToken", data.accessToken);
    config.headers = {
      authorization: data.accessToken,
    };
    return config;
  }
});

export default instance;
