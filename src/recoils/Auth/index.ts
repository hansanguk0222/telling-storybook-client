import { atom, selector, selectorFamily } from "recoil";
import { authService } from "@/services";
import { emptyValueChecker } from "@/utils";

export const userInfoState = atom({
  key: "userInfoState",
  default: null,
});

export const userEmailAndNicknameAtom = atom({
  key: "userEmailAndNickname",
  default: { email: "", nickname: "" },
});

export const loginSelector = selector({
  key: "auth/singin",
  get: async ({ get }) => {
    try {
      const { email, nickname } = get(userEmailAndNicknameAtom);
      if (!emptyValueChecker([email, nickname])) {
        const { data } = await authService.login({ email, nickname });
        localStorage.setItem(
          "accessToken",
          `Bearer ${String(data.accessToken)}`
        );
        localStorage.setItem("userId", String(data.userId));
        return data;
      }
    } catch (err) {
      console.log(err);
      alert("에러가 발생했습니다.");
      return false;
    }
  },
});
