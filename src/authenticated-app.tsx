import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
// import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
export const AuthenticatedApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          {/* working as context to make components communicating about route info */}

          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header gap={2}>
      <ButtonNoPadding type="link" onClick={resetRoute}>
        <SoftwareLogo width="2.4rem" height="2.4rem" color="rgb(38,132,255)" />
      </ButtonNoPadding>
      <ProjectPopover />
      <span>用户</span>
      <User />
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
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
  );
};
const Container = styled.div`
  /* grid-template-columns: 6rem 1fr; */
  height: 100vh;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
`;
const Header = styled(Row)`
  /* height: 6rem; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  /* z-index: 1; */
  & :last-child {
    margin-left: auto;
  }
`;
const Main = styled.main`
  flex: 1;
  /* grid-area: main; */
  overflow: hidden;
  /* padding: 3.2rem; */
`;
