import { calcRem } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${calcRem(35)};
  align-items: center;
`;

export const TwoWrapper: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
