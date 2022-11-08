import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header gap={2}>
        <h3>Logo</h3>
        <h3>用户</h3>
        <h3>项目</h3>
        <button onClick={logout}>登出</button>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const Container = styled.div`
  /* display: grid; */
  grid-template-columns: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  height: 6rem;
  background-color: gray;
  & :last-child {
    margin-left: auto;
  }
`;
const Main = styled.main`
  grid-area: main;
`;
