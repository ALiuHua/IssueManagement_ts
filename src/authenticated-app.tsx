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
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        {/* working as context to make components communicating about route info */}
        <Router>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  console.log("Headering running");
  return (
    <Header gap={2}>
      <ButtonNoPadding type="link" onClick={resetRoute}>
        <SoftwareLogo width="2.4rem" height="2.4rem" color="rgb(38,132,255)" />
      </ButtonNoPadding>
      <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
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
