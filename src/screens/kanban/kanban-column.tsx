import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  console.log(taskTypes);
  console.log(id);
  if (!name) {
    return null;
  }
  return (
    <img src={name === "task" ? taskIcon : bugIcon} alt="icon" width="18rem" />
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const tasks = allTasks.filter((task) => task.kanbanId === kanban.id);
  console.log(allTasks);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <TaskTypeIcon id={task.typeId} />
            <div>{task.name}</div>
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
