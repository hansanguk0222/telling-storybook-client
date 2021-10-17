import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { loginSelector, userEmailAndNicknameAtom } from "@/recoils/Auth";
import { emptyValueChecker } from "@/utils";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Login = () => {
  const setUserEmailAndNickname = useSetRecoilState(userEmailAndNicknameAtom);
  const loginSelectorLodable = useRecoilValueLoadable(loginSelector);

  useEffect(() => {
    if (
      loginSelectorLodable.state === "hasValue" &&
      loginSelectorLodable.contents !== undefined
    ) {
      window.location.href = "http://localhost:3000/";
    }
  }, [loginSelectorLodable]);

  const googleLoginSuccess = useCallback((response) => {
    setUserEmailAndNickname({
      email: `${response.googleId}@google.com`,
      nickname: response.it.Re,
    });
  }, []);

  const googleLoginFailure = useCallback(() => {
    alert("구글 로그인 도중 오류가 발생하였습니다.");
  }, []);
  return (
    <Container>
      <ButtonBox>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
          buttonText="구글로 로그인하기"
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      </ButtonBox>
    </Container>
  );
};
