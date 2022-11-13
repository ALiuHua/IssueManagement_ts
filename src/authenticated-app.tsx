import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  console.log(logout);
  return (
    <Container>
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
