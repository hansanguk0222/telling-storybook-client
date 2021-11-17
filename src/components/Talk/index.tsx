import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 500px;
`;

const StyledA = styled.a`
  text-decoration: none;
  color: black;
  width: 120px;
  height: 50px;
  font-size: 40px;
  background: #ccdef2;
`;

export const Talk = () => (
  <Container>
    <StyledA href="http://localhost:4000">전체 회의방으로 이동</StyledA>
  </Container>
);
