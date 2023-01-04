import { Button, Dropdown, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "screens/project-list/search-panel";
import { useEditProject } from "utils/use-projects";

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
  projectButton: JSX.Element;
  retry: () => void;
}

export const List: React.FC<ListProps> = ({
  users,
  retry,
  projectButton,
  ...props
}) => {
  const { mutate } = useEditProject();
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });
  //函数的柯里化 p44 point free
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(() => retry());
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
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: projectButton,
                      key: "edit",
                    },
                    {
                      label: (
                        <Button type="link" onClick={() => {}}>
                          删除
                        </Button>
                      ),
                      key: "edit",
                    },
                  ],
                }}
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

// th table head element / td table data cell element
