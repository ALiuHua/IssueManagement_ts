import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router";
import { ProjectScreen } from "screens/project";
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* working as context to make components communicating about route info */}
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header gap={2}>
      <SoftwareLogo width="2.4rem" height="2.4rem" color="rgb(38,132,255)" />
      <h3>用户</h3>
      <h3>项目</h3>

      <Dropdown
        // overlay={
        //   <Menu>
        //     <Menu.Item key="logout">
        //       <button onClick={logout}>登出</button>
        //     </Menu.Item>
        //   </Menu>
        // }
        menu={{
          items: [
            {
              label: (
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              ),
              key: "logout",
            },
          ],
        }}
      >
        <Button type="link">Hi, {user?.name}</Button>
      </Dropdown>
    </Header>
  );
};
const Container = styled.div`
  /* display: grid; */
  grid-template-columns: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  /* height: 6rem; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  & :last-child {
    margin-left: auto;
  }
`;
const Main = styled.main`
  grid-area: main;
`;
