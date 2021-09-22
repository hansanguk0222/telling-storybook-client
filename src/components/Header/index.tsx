import styled from "styled-components";
import React from "react";
import header from "@/images/header.jpg";
import { NavBar } from "../NavBar";

const Container = styled.div`
  height: 360px;
  @media only screen and (min-width: 768px) {
    height: 480px;
  }
  width: 100%;
  background-image: url(${header});

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
`;

const HeaderName = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
  color: ${(props) => props.theme.color.gray4};
`;

const LinkHomeA = styled.a`
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.color.gray4};
  }
  &:hover {
    color: ${(props) => props.theme.color.gray4};
  }
  width: 130px;
  @media only screen and (min-width: 768px) {
    width: 150px;
  }
`;

export const Header = () => (
  <Container>
    <LinkHomeA href="/">
      <HeaderName>아서의 책방</HeaderName>
    </LinkHomeA>
    <NavBar />
  </Container>
);
