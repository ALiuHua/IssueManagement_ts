import { Button, Dropdown, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "screens/project-list/search-panel";
import { useDeleteProject, useEditProject } from "utils/use-projects";
import { useProjectModal, useProjectQueryKey } from "./utils";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  // projectButton: JSX.Element;
  // retry: () => void;
}

export const List: React.FC<ListProps> = ({
  users,
  // retry,

  ...props
}) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });
  // //函数的柯里化 p44 point free
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // onCheckedChange={(pin) => pinProject(project.id, pin)}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

// th table head element / td table data cell element

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确认删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <Button type="link" onClick={editProject(project.id)}>
                编辑
              </Button>
            ),
            key: "edit",
          },
          {
            label: (
              <Button
                type="link"
                onClick={() => {
                  confirmDeleteProject(project.id);
                }}
              >
                删除
              </Button>
            ),
            key: "delete",
          },
        ],
      }}
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
