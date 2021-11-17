import axios, { AxiosResponse } from "axios";

export const authService = {
  login: async ({ email, nickname }: { email: string; nickname: string }) => {
    const getData = await axios.post("http://localhost:8000/auth/signin", {
      email,
      nickname,
    });
    return getData as AxiosResponse<
      { userId: number; accessToken: string },
      any
    >;
  },
};
