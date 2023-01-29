import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/utils";
import { useProjects } from "utils/use-projects";
import { useUser } from "utils/use-user";
import { ButtonNoPadding } from "./lib";

export const UserPopover = () => {
  const { data: users, refetch } = useUser();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );
  return (
    <Popover
      content={content}
      placement="bottomLeft"
      onVisibleChange={() => {
        refetch();
      }}
    >
      <span>组员</span>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
