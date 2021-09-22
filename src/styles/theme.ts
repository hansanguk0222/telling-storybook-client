import { DefaultTheme } from "styled-components";

export const calcRem = (size: number) => `${size / 16}rem`;

export const theme: DefaultTheme = {
  color: {
    gray1: "#aaa",
    gray2: "#bbb",
    gray3: "#ccc",
    gray4: "#ddd",
    gray5: "#eee",
    white: "#fff",
  },
};
