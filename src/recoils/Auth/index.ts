import { atom, selector } from "recoil";

export const authLoginState = atom({
  key: "authLoginState",
  default: JSON.parse(localStorage.getItem("accessToken")), //토큰이 들어가야 됨
});

// export const authLoginQuery = selector({
//   key: "post/auth/login",
//   // post:
// });
