import { Outlet } from "react-router-dom"
import styled from "styled-components";
import Header from "./Header";

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1.2rem 4.8rem;
  overflow: scroll;
`;

const Container = styled.div`
  background-color: var(--color-grey-50);
  overflow: scroll;
`;
const AppLayout = () => {
  return (
    <StyledLayout>
       <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
}

export default AppLayout