import React from "react";
import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  align-items: flex-end;
  padding-bottom: 15px;
`;

export const StyledA = styled.a`
  text-decoration: none;
  font-size: 15px;
  margin-right: 7px;
  @media only screen and (min-width: 768px) {
    margin-right: 10px;
    font-size: 20px;
  }
  color: ${(props) => props.theme.color.gray4};
`;

//board에서 novel과 report가 나온다.
//선택된 항목 bold 처리
export const NavBar = () => (
  <Container>
    <StyledA href="/asmrs">ASMR</StyledA>
    <StyledA href="/novels">소설</StyledA>
    <StyledA href="/voicerooms">음성채팅</StyledA>
    <StyledA href="/reports">독후감 공유</StyledA>
    <StyledA href="/gpas">책 평점</StyledA>
  </Container>
);
