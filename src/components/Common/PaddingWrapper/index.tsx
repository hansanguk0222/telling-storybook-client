import styled from "styled-components";

const Container = styled.div`
  padding: 0 20%;
  width: 100%;
  height: 100vh;
  margin-top: 200px;
  padding-top: 50px;
  background: #eaeaea;
`;

export const PaddingWrapper: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
