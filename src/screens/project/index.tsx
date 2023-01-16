import styled from "@emotion/styled";
import { Menu } from "antd";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
export const ProjectScreen = () => {
  console.log("project screen 渲染上、");
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanbanScreen />}></Route>
          <Route path="/epic" element={<EpicScreen />}></Route>
          <Route path="*" element={<Navigate to={"kanban"} replace />} />
          {/* <Route path="*" element={<Navigate to={"kanban"} />} /> 
        // 如果不加replace无法实现后退按钮回退到上一个页面。因为跳转默认是push
        */}
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
  height: 100%;
`;
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 100%;
  overflow-x: scroll;
  /* overflow: hidden; */
`;
