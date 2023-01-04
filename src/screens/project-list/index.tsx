import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUser } from "utils/use-user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  console.log("project list running");
  // const [param, setParam] = useState({ name: "", personId: "" });
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const { data: users } = useUser();
  //这里list users没有定义应该是不对的
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {/* {props.projectButton} */}
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list || []}
        loading={isLoading}
        users={users || []}
        retry={retry}
      />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
