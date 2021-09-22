import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

export const Container = styled.nav`
  display: flex;
  align-items: flex-end;
`;

export const StyledA = styled.a<{ isSelected: boolean }>`
  text-decoration: none;
  font-size: 15px;
  margin-right: 16px;
  height: 30px;
  margin-bottom: 15px;
  position: relative;
  @media only screen and (min-width: 768px) {
    margin-right: 20px;
    font-size: 20px;
  }
  font-weight: 500;
  color: ${(props) => props.theme.color.gray4};
  ${(props) =>
    props.isSelected &&
    css`
      &:after {
        content: "";
        width: 100%;
        position: absolute;
        right: 0;
        top: 41px;

        border-bottom: 4px solid ${(props) => props.theme.color.gray4};
      }
    `}
`;

//board에서 novel과 report가 나온다.

export const NavBar = () => {
  const location = useLocation();
  return (
    <Container>
      <StyledA
        href="/asmrs"
        isSelected={location && location.pathname === "/asmrs"}
      >
        오디오북
      </StyledA>
      <StyledA
        href="/novels"
        isSelected={location && location.pathname === "/novels"}
      >
        소설
      </StyledA>
      <StyledA
        href="/voicerooms"
        isSelected={location && location.pathname === "/voicerooms"}
      >
        음성채팅
      </StyledA>
      <StyledA
        href="/reports"
        isSelected={location && location.pathname === "/reports"}
      >
        독후감 공유
      </StyledA>
      <StyledA
        href="/gpas"
        isSelected={location && location.pathname === "/gpas"}
      >
        책 평점
      </StyledA>
    </Container>
  );
};
